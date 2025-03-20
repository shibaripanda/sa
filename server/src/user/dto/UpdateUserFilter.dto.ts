import { IsNotEmpty, IsString, Length } from 'class-validator'

export class UpdateUserFilter {

    @IsNotEmpty()
    readonly filter: string

    @IsNotEmpty()
    readonly item: string | []

    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    readonly serviceId: string

    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    readonly subServiceId: string
}


