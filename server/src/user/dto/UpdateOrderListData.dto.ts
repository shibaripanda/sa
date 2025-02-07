import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator'

export class UpdateOrderListData {

    @IsNotEmpty()
    @IsBoolean()
    readonly status: boolean

    @IsNotEmpty()
    @IsString()
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


