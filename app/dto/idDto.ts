import { IsInt, IsNotEmpty, IsNumberString, Min } from 'class-validator';
import { Type } from 'class-transformer';
/** 通用的查询详情和删除DTO，只包含一个 ID 参数 */
export class IdDto {
  @IsNotEmpty()
  id: number;
}
