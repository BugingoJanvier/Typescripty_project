import { Injectable } from '@nestjs/common';
import { Task, TaskPriority, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { createTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }
    
    getTaskById(id: string): Task | undefined {
        return this.tasks.find(task => task.id === id);
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
            throw new Error(`Task with ID ${id} not found`);
        }        
        task.status = updateTaskStatusDto.newStatus;
        task.priority = updateTaskStatusDto.newPriority;
        task.updatedAt = new Date(); 
        
        return task;
    }

    deleteTask(id: string): Task {
        const task = this.getTaskById(id);
        if (!task) {
            throw new Error(`Task with ID ${id} not found`);
        }
        this.tasks = this.tasks.filter(d => d.id !== id);
        return task;
    }
    
}