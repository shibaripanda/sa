import { IsNotEmpty, IsString, Length } from 'class-validator'

export class ChangeSubServiceDataDto {
    // @IsNotEmpty()
    // @IsString()
    // @Length(1, 50)
    readonly workTime?: string

    // @IsNotEmpty()
    // @IsString()
    // @Length(1, 50)
    readonly contact?: string

    // @IsNotEmpty()
    // @IsString()
    // @Length(1, 50)
    readonly address?: string

    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
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


