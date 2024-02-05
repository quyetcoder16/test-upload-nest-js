import { Inject, Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class loggerTestMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: Function): void {
        console.log("logger middleware class");
        next();
    }
}