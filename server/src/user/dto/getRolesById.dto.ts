import { IsNotEmpty } from 'class-validator'

export class RolesByUserIdDto {
    @IsNotEmpty()
    readonly _id: string
}


