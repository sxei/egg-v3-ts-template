import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { BadRequestdException } from '../exception';
import { QUERY_METADATA_KEY } from './Params';

/**
 * Egg辅助注解，目前主要作用：
 * 1. 如果 controller 有返回值，自动增加 ctx.body = { code: 0, data: returnValue };
 * 2. 同时支持写在class上和方法上，如果写在类上，则对除_开头的所有方法生效；
 * 3. 配合 @Params @Query @Body 注解，自动植入参数并对参数进行 class-transformer 和 class-validator
 * @param tag 暂无意义
 * @returns
 */
export function EasyEgg(tag?: string) {
  return function(target: any, name?: string, descriptor?: any) {
    function updateDescriptor(target: any, methodName: string, descriptor: TypedPropertyDescriptor<any>) {
      if (!descriptor) {
        return;
      }
      const original = descriptor.value;
      descriptor.value = async function(...args: any[]) {
        if (tag) {
          console.log(`${tag}: calling ${methodName} with arguments: ${args}`);
        }

        // 获取被 @Query 注解的参数索引
        const queryIndexs: any[] = Reflect.getOwnMetadata(QUERY_METADATA_KEY, target, methodName) || [];
        // tsconfig 需要开启 emitDecoratorMetadata
        const paramTypes = Reflect.getMetadata('design:paramtypes', target, methodName);
        for (const [idx, type] of queryIndexs) {
          const paramType = paramTypes[idx];
          const paramsKey = this.ctx.method === 'GET' ? 'query' : 'body';
          let params = this.ctx.request[type === 'auto' ? paramsKey : type];
          // TODO 兼容未定义类型场景
          this.ctx.logger.info('paramType', paramType, paramType?.name);
          if (paramType) {
            params = plainToInstance(paramType, params);
            try {
              await validateOrReject(params);
            } catch (error: any) {
              this.ctx.logger.error(error);
              // TODO 中文处理
              throw new BadRequestdException(Object.values(error?.[0]?.constraints || {}).join('；'));
            }
          }
          // 注入 params 对象
          args[idx] = params;
        }

        let retVal = await original.apply(this, args);
        if (retVal !== undefined) {
          // 如果是对象，自动包裹 { code, data }
          if (typeof retVal !== 'string') {
            retVal = { code: 0, message: 'success', data: retVal };
          }
          this.ctx.body = retVal;
        }
      };
    }
    // 方法装饰器
    if (descriptor) {
      updateDescriptor(target, name, descriptor);
      return descriptor;
    }
    // 类装饰器
    const methodNames = Object.getOwnPropertyNames(target.prototype).filter(
      (name) => name !== 'constructor' && typeof target.prototype[name] === 'function',
    );
    for (const methodName of methodNames) {
      const methodDescriptor = Object.getOwnPropertyDescriptor(target.prototype, methodName);
      // 约定 _ 开头的方法是私有方法，不处理
      const isPublic = !methodName.startsWith('_');
      if (methodDescriptor && isPublic) {
        updateDescriptor(target.prototype, methodName, methodDescriptor);
        Object.defineProperty(target.prototype, methodName, methodDescriptor);
      }
    }
  };
}
