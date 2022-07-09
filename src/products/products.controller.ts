import { Controller, HttpCode, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

    constructor(private readonly ProductService: ProductsService) {}

    // @HttpCode(200)
    // @Get('loggin')
    // async addProduct(@Param('name') dto: AuthDto) {
        // return this.AuthService.loggin(dto)
    // }
}
