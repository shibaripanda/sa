import { IsMongoId, IsNotEmpty, Length } from 'class-validator'

export class GetServiceByIdDto {

    @IsNotEmpty()
    @IsMongoId()
    @Length(1, 50)
    readonly serviceId: string
}


