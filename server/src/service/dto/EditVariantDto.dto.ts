import { IsNotEmpty, IsString, Length } from 'class-validator'

export class EditVariantDto {

    @IsNotEmpty()
    @IsString()
    readonly item: string

    @IsNotEmpty()
    @IsString()
    readonly variant: string

    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    readonly serviceId: string

    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    readonly subServiceId: string
}


