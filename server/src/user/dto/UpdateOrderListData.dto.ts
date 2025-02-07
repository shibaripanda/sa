import { IsNotEmpty, IsString, Length } from 'class-validator'

export class UpdateOrderListData {

    // @IsNotEmpty()
    // @IsBoolean()
    readonly status: boolean

    // @IsNotEmpty()
    // @IsNumber()
    readonly index1: number

    // @IsNotEmpty()
    // @IsNumber()
    readonly index2: number


    @IsNotEmpty()
    @IsString()
    readonly action: string

    // @IsNotEmpty()
    // @IsString()
    readonly data: string

    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    readonly serviceId: string

    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    readonly subServiceId: string
}


