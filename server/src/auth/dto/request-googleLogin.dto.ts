import { IsNotEmpty, IsString } from 'class-validator'

export class RequestGoogleLogin {

    @IsNotEmpty()
    @IsString()
    readonly access_token: string

    // @IsNotEmpty()
    // @IsString()
    // readonly credential: string

    // @IsNotEmpty()
    // @IsString()
    // readonly select_by: string
}
