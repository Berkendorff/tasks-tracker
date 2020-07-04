import { createParamDecorator } from "@nestjs/common";
import { User } from "../users/user.entity";

export const GetUser = createParamDecorator(async (data, req): Promise<User>=>{
    return await req.user;
});