import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDTO } from "./user.dto";

@Controller("user")
export class UserController {
  constructor(private service: UserService) {}

  @Get()
  public async getAllUsers(): Promise<UserDTO[]> {
    return await this.service.getAllUsers();
  }

  @Get(":id")
  public async getOneUser(@Param("id") id: string): Promise<UserDTO> {
    return await this.service.getUserById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  public async post(@Body() dto: UserDTO): Promise<UserDTO> {
    return this.service.create(dto);
  }
}
