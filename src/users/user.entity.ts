import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Task } from 'src/tasks/task.entity';


@Entity()
@Unique(['email'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    first_name: string;

    @Column({nullable: true})
    second_name: string;

    @Column()
    email: string;
    
    @Column('text')
    password: string;

    @Column('text')
    salt: string;

    @Column()
    date_creation: Date;

    @OneToMany(type=>Task,task=>task.user, {eager: true})
    tasks: Task[];

    async validatePassword(password: string): Promise<boolean>{
        return this.password === await bcrypt.hash(password, this.salt);
    }
}