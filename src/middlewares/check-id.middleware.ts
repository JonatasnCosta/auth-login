import { BadRequestException, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export class CheckIdMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        console.log("Middleware before");
        
        if (isNaN(Number(req.params.id))  || Number(req.params.id) <= 0) {
            throw new BadRequestException("Invalid id")
        }
        console.log("Middleware after");
        next();
    }
}