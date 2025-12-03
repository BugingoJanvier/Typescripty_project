import { IsOptional, IsIn, IsNotEmpty, IsString } from "class-validator";
import { TaskStatus } from "../task.model";

export class GetTasksFilterDto {
    @IsOptional()
    @IsIn([TaskStatus.PENDING, TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED])
    status?: TaskStatus;
    search?: string;
}