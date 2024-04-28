import { BaseRepositoryContract } from "../../../../core/repositories/contract/base.repository.contract";
import { UserModel } from "../../infra/database/typeorm/models/user.model";


export abstract class UserRepositoryContract extends BaseRepositoryContract<UserModel> {
    abstract findByEmail(email: string): Promise<UserModel>;
    abstract findOne(id: string ): Promise<UserModel | undefined>;
    
}
