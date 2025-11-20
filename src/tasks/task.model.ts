export interface Task {
    id: number;
    title: string;
    description?: string;
    status: TaskStatusProperty;
}

enum TaskStatusProperty {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
}