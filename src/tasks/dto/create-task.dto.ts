import { Type } from "class-transformer";
import { IsOptional, IsIn, IsNotEmpty, IsString, IsDate } from "class-validator";
export class createTaskDto {
    @IsNotEmpty()
    @IsString()
    title: string;
    @IsString()
    @IsNotEmpty()
    description?: string;
    @Type(() => Date)
    @IsDate({ message: "dueDate must be a Date instance YYYY-MM-DD" })
    dueDate?: Date;
}