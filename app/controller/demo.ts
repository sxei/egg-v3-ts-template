import { Controller } from 'egg';
import { Route, HttpGet, HttpPost } from 'egg-decorator-router';
import { CreateDemoDto, QueryDemoDto, UpdateDemoDto } from '@/dto/demo';
import { EasyEgg, Params } from '@/com/annotation';
import { IdDto } from '@/dto/idDto';
import { NotFoundDataException } from '@/com/exception';
import { Op } from 'sequelize';

@EasyEgg()
@Route('/api/demo')
export default class DemoController extends Controller {
  /** 新增数据 */
  @HttpPost()
  async create(@Params model: CreateDemoDto) {
    await this.ctx.model.Demo.create(model);
    return true;
  }

  /** 删除数据 */
  @HttpPost()
  async delete(@Params { id }: IdDto) {
    const model = await this.ctx.model.Demo.findByPk(id);
    if (!model) throw new NotFoundDataException(id);
    await model.destroy();
    return true;
  }

  /** 修改数据 */
  @HttpPost()
  async update(@Params { id, ...params }: UpdateDemoDto) {
    const model = await this.ctx.model.Demo.findByPk(id);
    if (!model) throw new NotFoundDataException(id);
    await model.update(params);
    return true;
  }

  /** 查询列表 */
  @HttpGet()
  async list(@Params dto: QueryDemoDto) {
    // 调用封装好的参数处理，会自动处理分页、排序、where封装，默认采用 Op.eq 查询
    // 支持简单的自定义查询方式，例如将 remark 设置为模糊查询
    dto.name = 'COM_FILE_UPLOAD';
    const query = dto.toQuery({
      name: Op.not,
      remark: Op.substring,
    });

    // 可选的更复杂的参数处理
    // const { createdStart, createdEnd, ...where } = query.where || {};
    // if (createdStart && createdEnd) {
    //   where.createdAt = { [Op.between]: [createdStart, createdEnd] };
    // }
    // query.where = where;

    const { rows, count } = await this.ctx.model.Demo.findAndCountAll(query);
    // 兼容antd组件规范
    return { data: rows, total: count, success: true };
  }

  /** 查询详情 */
  @HttpGet()
  async detail(@Params { id }: IdDto) {
    return await this.ctx.model.Demo.findByPk(id);
  }

  // async topUser(@Params dto: QueryOpLogDTO) {
  //   const data = await this.ctx.model.PvLog.findAll({
  //     attributes: ['uname', [fn('COUNT', col('*')), 'count']],
  //     group: 'uname',
  //     order: [['count', 'desc']],
  //     limit: dto.pageSize || 10,
  //   });
  //   return { success: true, data };
  // }
}
