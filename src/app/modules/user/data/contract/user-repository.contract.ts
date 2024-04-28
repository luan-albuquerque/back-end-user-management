// user.repository.interface.ts

import { BaseRepositoryContract } from "src/app/core/repositories/contract/base.repository.contract";
import { UserModel } from "../../infra/database/typeorm/models/user.model";


export abstract class UserRepositoryContract extends BaseRepositoryContract<UserModel> {

}
