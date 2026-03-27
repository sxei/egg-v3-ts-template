import { Length, IsNotEmpty, IsNumberString, IsOptional, IsDateString } from 'class-validator';
import BaseQueryDto from './baseQueryDto';
import { Type } from 'class-transformer';

/** 新增 */
export class CreateDemoDto {
  /** ERP账号 */
  @Length(3, 30, { message: '长度必须在3和30之间' })
  @IsNotEmpty()
  erp: string;

  /** 姓名 */
  @Length(2, 30)
  @IsNotEmpty()
  name: string;

  /** 如果字段非必填且添加了校验规则，一定要添加 @IsOptional()  */
  @IsNumberString()
  @IsOptional()
  height: number;

  /** 性别 */
  gender: string;

  /** 头像 */
  avatar: string;

  @IsNumberString()
  @IsOptional()
  edu: number;

  /** 生日 */
  @IsOptional()
  @IsDateString()
  birthday: Date;

  /** 备注 */
  remark: string;
}

/** 修改 */
export class UpdateDemoDto {
  @IsNotEmpty()
  id: number;

  /** 如果字段非必填且添加了校验规则，一定要添加 @IsOptional()  */
  @IsOptional()
  @Length(2, 30)
  erp: string;

  @IsOptional()
  @Length(2, 30)
  name: string;

  @IsOptional()
  @IsNumberString()
  height: number;

  @IsOptional()
  @IsDateString()
  birthday: Date;

  remark: string;
}

/** 查询 */
export class QueryDemoDto extends BaseQueryDto {
  erp: string;

  name: string;

  @IsOptional()
  @IsNumberString()
  height: number;

  @IsOptional()
  @IsDateString()
  createdStart: Date;

  @IsOptional()
  @IsDateString()
  createdEnd: Date;

  @Type(() => Boolean)
  enable: boolean;
}
