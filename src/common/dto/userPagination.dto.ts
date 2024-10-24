import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class UserPaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  limit?: number;

  @IsOptional()
  @Min(1)
  @Type(() => Number)
  offset?: number;
}
