import { IsNumber, IsString } from "class-validator";

export class ProductsDto {
    @IsString()
    name: string
    description: string

    @IsNumber()
    count: number
}