import { IsNotEmpty, IsString, Length } from 'class-validator'

export class EditOrderDataDto {

    @IsNotEmpty()
    @IsString()
    readonly item: string

    @IsNotEmpty()
    @IsString()
    readonly data: string

    @IsNotEmpty()
    readonly newValue: string | boolean

    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    readonly serviceId: string

    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    readonly subServiceId: string
}


