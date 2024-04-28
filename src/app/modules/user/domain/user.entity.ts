//Considere os seguintes dados para o usuário: Nome, Sobrenome, e-mail, senha, nível de acesso

import { randomUUID } from "crypto";

export enum AccessLevel {
     ADMIN = 1,
     STANDARD = 2,
}

export type UserProps = {
   name: string;
   surname: string;
   email: string;
   password: string;
   access_level: AccessLevel;
}


export class UserEntity {
    public readonly id:string;
    public props:  Required<UserProps>

    private constructor(props: UserProps, id?: string){
        this.id = id || randomUUID();
        this.props = {
            ...props,
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

//METHOD
  
 updateName(name: string): void{
        this.name = name;
  }

  updateSurname(surname: string): void {
    this.surname = surname;
  }

  updateEmail(email: string): void {
    this.email = email;
  }

  updatePassword(password: string): void {
    this.password = password;
  }

  updateAccesslevel(access_level: AccessLevel): void {
    this.access_level = access_level;
  }


}