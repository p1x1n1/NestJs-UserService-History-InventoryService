import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    readonly name?: string;

    @IsOptional()
    @IsString()
    readonly email?: string;

    @IsOptional()
    @IsBoolean()
    readonly hasProblems?: boolean;
}