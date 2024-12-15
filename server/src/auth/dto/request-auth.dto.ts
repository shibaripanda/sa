import { IsEmail } from 'class-validator'

export class ReqestAuthDto {
    @IsEmail()
    readonly email: string
    readonly leng?: string
    readonly authCode?: number
}


// class EmailDto {
//   @IsEmail()
//   email: string;

//   @IsNotEmpty()
//   password?: string;
// }