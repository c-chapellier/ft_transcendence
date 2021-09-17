import { Request } from "express";
import { UserEntity } from "../model/user.entity";

export interface RequestWithUser extends Request {
  user: UserEntity;
}
// export default RequestWithUser;
