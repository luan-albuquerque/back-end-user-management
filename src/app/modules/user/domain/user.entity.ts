//Considere os seguintes dados para o usuário: Nome, Sobrenome, e-mail, senha, nível de acesso

import { randomUUID } from "crypto";
import { AccessLevel } from "../data/enums/acess-level.enum";


export type UserProps = {
   name: string;
   surname: string;
   email: string;
   password: string;
   access_level: AccessLevel;
   is_enabled: boolean;
   createdAt: Date;
   updatedAt?: Date | null;
}


export class UserEntity {
    public readonly id:string;
    public props:  Required<UserProps>

    private constructor(props: UserProps, id?: string){
        this.id = id || randomUUID();
        this.props = {
            ...props,
            createdAt: new Date(),
            updatedAt: null,
        }
    }

  static create(props: UserProps, id?: string) : UserEntity {
       return new UserEntity(props, id);
  }
  // GET
  get name(){
    return this.props.name;
  }
  get surname(){
    return this.props.surname
  }
  get email(){
    return this.props.email;
  }
  get password(){
    return this.props.password
  }
  get access_level(){
    return this.props.access_level
  }
  get is_enabled(){
    return this.props.is_enabled;
  }
  get createdAt(){
    return this.props.createdAt;
  }
  get updatedAt(){
    return this.props.updatedAt;
  }

  // SET
  private set name(value: string){
    this.props.name = value;
  }

  private set surname(value: string){
    this.props.surname = value;
  }

  private set email(value: string){
    this.props.email = value;
  }

  private set password(value: string){
    this.props.password = value;
  }

  private set access_level(value: number){
    this.props.access_level = value;
  }

  private set is_enabled(value: boolean){
    this.props.is_enabled = value;
  }

  private set updateAt(value: Date){
    this.props.updatedAt = value;
  }
//METHOD
  
 updateName(name: string): void{
        this.name = name;
        this.updateAt = new Date();
  }

  updateSurname(surname: string): void {
    this.surname = surname;
    this.updateAt = new Date();
  }

  updateEmail(email: string): void {
    this.email = email;
    this.updateAt = new Date();
  }

  updatePassword(password: string): void {
    this.password = password;
    this.updateAt = new Date();
  }

  updateAccesslevel(access_level: AccessLevel): void {
    this.access_level = access_level;
    this.updateAt = new Date();
  }

  updateIsEnabled(is_enabled: boolean): void {
    this.is_enabled = is_enabled;
    this.updateAt = new Date();
  }


}