import {PipeTransform, BadRequestException} from '@nestjs/common'
import {TaskStatus} from '../taskStatus.enum';

export class TaskStatusValidationPipe implements PipeTransform{

    readonly allowedStatuses = [
        TaskStatus.VIEW,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE,
    ]

    transform(value: any){
        if(this.allowedStatuses.indexOf(value)<0) throw new BadRequestException(`${value} is an invalid task status`);
        return value;
    }

}

