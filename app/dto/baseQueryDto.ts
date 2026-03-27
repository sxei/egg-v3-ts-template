import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsNumberString, IsOptional, Min } from 'class-validator';
import { Op } from 'sequelize';

export default class BaseQueryDto {
  /** 主键搜索 */
  id: number;

  /** 当前页码，不传默认1 */
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @Min(1)
  current: number;

  /** 分页大小，不传默认10 */
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  @Min(1)
  pageSize: number;

  /** 排序，形如 “id desc” */
  sort: string;

  /** 将浏览器入参转换成 sql 查询需要的参数 */
  public toQuery(options?: Record<string, any>) {
    const { current = 1, pageSize = 10, sort = 'updatedAt desc', createdAt, updatedAt, ...params } = this as any;
    // 删除空字符串，否则也会被查询
    for (const i in params) {
      if (params[i] === '') {
        delete params[i];
      }
    }
    for (const key in options || {}) {
      if (params[key]) {
        params[key] = { [options?.[key]]: params[key] };
      }
    }
    if (createdAt) {
      params.createdAt = { [Op.between]: JSON.parse(createdAt) };
    }
    if (updatedAt) {
      params.updatedAt = { [Op.between]: JSON.parse(params.updatedAt) };
    }
    return {
      where: params,
      order: sort ? [ sort.split(' ') ] : [],
      limit: pageSize,
      offset: (current - 1) * pageSize,
    };
  }
}
