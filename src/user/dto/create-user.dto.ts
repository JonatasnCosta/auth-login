import { IsEmail, IsEnum, IsNotEmpty, IsString, IsStrongPassword } from "class-validator"
import { Role } from "src/enums/role.enum"

export class CreateUserDto {
    
    @IsString()
    @IsNotEmpty()
    name: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsStrongPassword({
        minLength:6,
        minLowercase:0,
        minNumbers:0,
        minSymbols:0,
        minUppercase:0
    })
    password: string

    @IsEnum(Role)
    role: Role
}
