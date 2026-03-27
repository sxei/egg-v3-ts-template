import { Context } from 'egg';

export default {
  schedule: {
    interval: '1d', // 指定任务执行间隔
    // 也可以通过corn配置执行间隔
    // cron: '0 0 */3 * * *',
    type: 'worker',
  },
  async task(ctx: Context) {
    const res = await ctx.curl('https://www.baidu.com', {
      dataType: 'text',
    });
    ctx.logger.info('执行定时任务返回：', res);
  },
};
