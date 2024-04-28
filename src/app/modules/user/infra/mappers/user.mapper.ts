import { Injectable } from "@nestjs/common";
import { UserEntity } from "../../domain/user.entity";
import { DeepPartial } from "typeorm";
import { UserModel } from "../database/typeorm/models/user.model";

@Injectable()
export class UserMapper {
  entityToModel(user: UserEntity): UserModel {
    return {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      password: user.password,
      access_level: user.access_level,
      is_enabled: user.is_enabled,
      createdAt: user.createdAt,
      updateAt: user.updatedAt,
    };
  }

  modelToEntity(model: UserModel): UserEntity {
    return UserEntity.create({
      name: model.name,
      surname: model.surname,
      email: model.email,
      password: model.password,
      is_enabled: model.is_enabled,
      access_level: model.access_level,
      createdAt: model.createdAt,
      updatedAt: model.updateAt,
    }, model.id);
  }
}
