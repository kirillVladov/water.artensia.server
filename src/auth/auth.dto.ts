import { IsEmail, IsString, MinLength } from "class-validator";

export class AuthDto {
    @IsEmail()
    email: string

    @MinLength(6, {
        message: 'password connot be less then 6 characters'
    })

    @IsString()
    password: string

    @IsString()
    name: string

    @IsString()
    phone: string

    @IsString()
    address: string
}