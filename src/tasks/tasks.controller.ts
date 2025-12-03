import { Body, Patch, Delete,Controller, Get, Param, Post, NotFoundException, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { Task } from './task.model';
import { createTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/Search.dto';

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

    @Get()
    getTasks(@Query() filterDTO: GetTasksFilterDto): Task[] {

        if (Object.keys(filterDTO).length) {
            return this.tasksService.getTaskWithFilters(filterDTO);
        }else{
        return this.tasksService.getAllTasks();    
        }
        
    }
}
