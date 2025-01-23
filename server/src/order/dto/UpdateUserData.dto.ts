import { IsNotEmpty, IsString, Length } from 'class-validator'

export class UpdateUserData {

    // @IsNotEmpty()
    // @IsString()
    readonly newUserName: string

    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    readonly serviceId: string

    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    readonly subServiceId: string
}


