import { Body, Patch, Delete,Controller, Get, Param, Post, NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { Task } from './task.model';
import { createTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Post('/create')
    createTask(@Body() createTaskDto: createTaskDto): Task {   
        return this.tasksService.createTask(createTaskDto);
    }
    @Get('/all')
    getAllTasks(): Task[] {
        return this.tasksService.getAllTasks();
    }

    @Get('/:id')
    getTaskbyId(@Param('id') id: string): Task | undefined {

        return this.tasksService.getTaskById(id);
    }

    @Patch('/update/:id')
    updateTask(@Param('id') id: string, @Body() updateTaskStatusDto: any): Task {
        const task = this.tasksService.getTaskById(id);
        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
         return this.tasksService.updateTaskStatus(id, updateTaskStatusDto);
    }

    @Delete('/delete/:id')
    deleteTask(@Param('id') id: string): Task {
        const task = this.tasksService.getTaskById(id);
        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return this.tasksService.deleteTask(id);
    }   
    
}
