import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { compare, genSalt } from 'bcryptjs';
import { InjectModel } from 'nestjs-typegoose';
import { UserModel } from 'src/uesr/user.model';
import { AuthDto } from './auth.dto';
import { hash } from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(@InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>, private readonly jwtService: JwtService) {}

    async loggin(dto : AuthDto) {
        const user = await this.validateUser(dto)
        const tokens = await this.issueTokenPair(String(user._id))

        return{
            uesr: this.returUserFields(user),
            ...tokens
        }
    }

    async register(dto : AuthDto) {
       const oldUser = await this.UserModel.findOne({email: dto.email})
        
        if(oldUser) 
            throw new UnauthorizedException('User whith this email isset in system')

        const salt = await genSalt(10)
        const newUser = new this.UserModel( {email: dto.email, password: await hash(dto.password, salt)} )
        const user = await newUser.save()
        const tokens = await this.issueTokenPair(String(user._id))

        return{
            uesr: this.returUserFields(user),
            ...tokens
        }
    }

    async validateUser(dto:AuthDto) {
        const user = await this.UserModel.findOne({email: dto.email})
        
        if(!user) 
            throw new UnauthorizedException('User not found')
        
        const isValidPassword = await compare(dto.password, user.password)

        if(!isValidPassword)
            throw new UnauthorizedException('not valid password')

        return user
    }

    async issueTokenPair(_id:string) {
        const data = { _id }
        const accessToken = await this.jwtService.signAsync(data, {
            expiresIn: '10d'
        })

        return {accessToken}
    }

    returUserFields(user: UserModel) {
        return{
            _id: user._id,
            email:user.email
        }
    }
}
