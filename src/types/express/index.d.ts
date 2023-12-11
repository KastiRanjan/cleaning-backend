import { JwtPayload } from '../JwtPayload';

declare global {
  namespace Express {
    export interface Request {
      jwtPayload: JwtPayload;
      authToken?: string;
    }
    export interface Response {
      customSuccess(httpStatusCode: number, data?: any): Response;
    }
  }
}
