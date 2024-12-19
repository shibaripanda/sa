import { IsMongoId, IsNotEmpty, IsString, Length } from 'class-validator'

export class EditStatusServiceDto {

    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    readonly status: string

    @IsNotEmpty()
    @IsMongoId()
    @Length(1, 50)
    readonly serviceId: string
}


