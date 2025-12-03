import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskPriority, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { createTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/Search.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        
        const tasks = this.tasks;
        if (tasks.length === 0) {
            throw new NotFoundException('No tasks found');
        }
        return tasks;
    }

    getTaskWithFilters(filterDTO: GetTasksFilterDto): Task[] {

        const {status, search} = filterDTO;
        let tasks = this.getAllTasks();

        if (status) {
            tasks = tasks.filter(task => task.status === status);
        }

        if (search) {
            tasks = tasks.filter(task => 
                task.title.includes(search) || 
                task.description?.includes(search)
            );
        }
        
        return tasks;
    }
    
    getTaskById(id: string): Task | undefined {
        const task = this.tasks.find(task => task.id === id);
        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return task;
    }  

    createTask(createTaskDto:createTaskDto): Task {
        const { title, description, dueDate } = createTaskDto;
        const newTask: Task = {
            id: uuidv4(),
            title,
            description,
            status: TaskStatus.PENDING,
            priority: TaskPriority.MEDIUM,
            createdAt: new Date(),
            updatedAt: new Date(),
            dueDate,
        };
        
        this.tasks.push(newTask);
        return newTask;
    }

    updateTaskStatus(id: string, updateTaskStatusDto: UpdateTaskStatusDto): Task {
        const task = this.getTaskById(id);
        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }        
        task.status = updateTaskStatusDto.newStatus;
        task.priority = updateTaskStatusDto.newPriority;
        task.updatedAt = new Date(); 
        return task;
    }

    deleteTask(id: string): Task {
        const task = this.getTaskById(id);
        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        this.tasks = this.tasks.filter(d => d.id !== id);
        return task;
    }
    
}