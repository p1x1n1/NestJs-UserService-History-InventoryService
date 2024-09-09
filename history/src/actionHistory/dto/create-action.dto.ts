import { IsInt, IsOptional, IsDate, IsString, IsIn, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateActionHistoryDto {
    @IsOptional()
    @IsInt()
    shop_id?: number;

    @IsNotEmpty({ message: 'Поле не может быть пустым' })
    @IsString()
    plu: string;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    date_from?: Date;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    date_to?: Date;

    @IsNotEmpty({ message: 'Поле не может быть пустым' })
    @IsIn(['create', 'update', 'delete','get'])
    action: string;

    @IsOptional()
    @IsInt()
    page?: number;

    @IsOptional()
    @IsInt()
    pageSize?: number;
}
