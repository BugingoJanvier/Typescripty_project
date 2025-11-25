import { TaskStatus, TaskPriority } from '../task.model';

export class UpdateTaskDto {
    title?: string;
    description?: string;
}

export class UpdateTaskStatusDto {
    id: string;
    assignedTo: string;
    newStatus: TaskStatus;
    newPriority: TaskPriority;
}
