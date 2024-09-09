import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt, IsBoolean, Min, Max, IsIn, IsNotEmpty } from "class-validator";

export class CreateUserDto {

    @ApiProperty({ example: 'Иван', description: 'Имя пользователя' })
    @IsNotEmpty({ message: 'Поле не может быть пустым' })
    @IsString({ message: "Должно быть строкой" })
    readonly firstName: string;

    @ApiProperty({ example: 'Иванов', description: 'Фамилия пользователя' })
    @IsNotEmpty({ message: 'Поле не может быть пустым' })
    @IsString({ message: "Должно быть строкой" })
    readonly lastName: string;

    @ApiProperty({ example: '25', description: 'Возраст пользователя' })
    @IsNotEmpty({ message: 'Поле не может быть пустым' })
    @IsInt({ message: "Должно быть числом" })
    @Min(1, { message: 'Возраст должен быть больше 0' })
    @Max(100)
    readonly age: number;

    @ApiProperty({ example: 'female', description: 'Пол пользователя' })
    @IsNotEmpty({ message: 'Поле не может быть пустым' })
    @IsIn(['male', 'female'])
    readonly gender: string;

    @ApiProperty({ example: true, description: 'Имеются ли проблемы' })
    @IsNotEmpty({ message: 'Поле не может быть пустым' })
    @IsBoolean({ message: "Должно быть булевым значением" })
    readonly hasProblems: boolean;
}
