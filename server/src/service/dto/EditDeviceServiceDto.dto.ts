import { IsMongoId, IsNotEmpty, IsString, Length } from 'class-validator'

export class EditDeviceServiceDto {

    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    readonly device: string

    @IsNotEmpty()
    @IsMongoId()
    @Length(1, 50)
    readonly serviceId: string
}


