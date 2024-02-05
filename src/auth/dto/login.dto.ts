import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsEmpty, IsNotEmpty } from "class-validator"

export class loginDTO {
    @ApiProperty({ type: String, description: "email1" })
    @IsEmail()
    email: string
    @ApiProperty({ type: String, description: "pass_word" })
    @IsNotEmpty()
    pass_word: string
}