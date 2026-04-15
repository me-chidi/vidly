import * as exp from '#types/index';
export default function validate(validator?: Function): (req: exp.Request, res: exp.Response, next: exp.NextFunction) => exp.Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=validate.d.ts.map