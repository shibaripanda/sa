import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator'

export class ReplaceOrderDataDto {

    @IsNotEmpty()
    @IsNumber()
    readonly index1: number

    @IsNotEmpty()
    @IsNumber()
    readonly index2: number

    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    readonly serviceId: string

    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    readonly subServiceId: string
}


