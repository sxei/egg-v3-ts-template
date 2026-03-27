import 'reflect-metadata';

export const QUERY_METADATA_KEY = Symbol('egg-params-annotation');

const makeParamsAnnotation = (type?: string) => {
  return (target: any, name: string, idx: number) => {
    // 标记哪些参数上面有 @Params @Query @Body 注解
    // tsconfig 需要开启 emitDecoratorMetadata
    const indexs: any[] = Reflect.getOwnMetadata(QUERY_METADATA_KEY, target, name) || [];
    indexs.push([idx, type]);
    Reflect.defineMetadata(QUERY_METADATA_KEY, indexs, target, name);
  };
};

/** 自动获取参数的注解，需与 @EasyEgg() 一起使用，自动根据GET还是POST获取query或者body的参数 */
export const Params = makeParamsAnnotation('auto');

/** 获取query参数 */
export const Query = makeParamsAnnotation('query');

/** 获取body参数 */
export const Body = makeParamsAnnotation('body');
