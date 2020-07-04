import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import { TaskStatus } from './taskStatus.enum';
import { User } from 'src/users/user.entity';

@Entity()
export class Task extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;

    @ManyToOne(type=>User, user=>user.tasks, {eager: false, onDelete: "CASCADE"})
    user: User;
}