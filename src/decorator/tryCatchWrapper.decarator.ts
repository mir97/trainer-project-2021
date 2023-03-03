import { winstonLogger } from '../loggers/winston.loggers';

export const TryCatchWrapper = (
  target: any,
  propertyName: string,
  descriptor: TypedPropertyDescriptor<any>,
): void => {
  const method = descriptor.value;
  descriptor.value = async function(...args) {
    try {
      const result = await method.apply(this, args);
      return result;
    } catch (err) {
      winstonLogger.error(err.message || err.text);
      const [, , next] = args;
      next(err);
    }
  };
};
