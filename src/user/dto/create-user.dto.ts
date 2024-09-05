import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt, IsBoolean, Min } from "class-validator";

export class CreateUserDto {

    @ApiProperty({ example: 'Иван', description: 'Имя пользователя' })
    @IsString({ message: "Должно быть строкой" })
    readonly firstName: string;

    @ApiProperty({ example: 'Иванов', description: 'Фамилия пользователя' })
    @IsString({ message: "Должно быть строкой" })
    readonly lastName: string;

    @ApiProperty({ example: '25', description: 'Возраст пользователя' })
    @IsInt({ message: "Должно быть числом" })
    @Min(1, { message: 'Возраст должен быть больше 0' })
    readonly age: number;

    @ApiProperty({ example: 'female', description: 'Пол пользователя' })
    @IsString({ message: "Должно быть строкой" })
    readonly gender: string;

    @ApiProperty({ example: true, description: 'Имеются ли проблемы' })
    @IsBoolean({ message: "Должно быть булевым значением" })
    readonly hasProblems: boolean;
}
