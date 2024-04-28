import { Column, Entity } from 'typeorm';

@Entity()
export class UserModel {
  @Column('uuid', { unique: true, primary: true, nullable: false })
  id: string;
  @Column({ length: 120 })
  name: string;
  @Column({ length: 120 })
  surname: string;
  @Column({ length: 255, unique: true })
  email: string;
  @Column({ length: 120 })
  password: string;
  @Column('int')
  access_level: number;
  @Column('timestamp')
  createdAt: Date;
  @Column("timestamp")
  updateAt: Date;
}
