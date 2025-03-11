import { IsNotEmpty, IsString } from 'class-validator'

export class RequestGoogleLogin {

    @IsNotEmpty()
    @IsString()
    readonly clientId: string

    @IsNotEmpty()
    @IsString()
    readonly credential: string

    @IsNotEmpty()
    @IsString()
    readonly select_by: string
}
