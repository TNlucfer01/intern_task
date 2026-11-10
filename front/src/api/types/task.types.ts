export interface Task {
  id: number;
  title: string;
  description: string | null;
  assignedTo: number;
  completedAt: string | null;
  timeTaken: number | null;
  deadline: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  associatedProject: number;
  assignedby: number;
}

export interface CreateTaskInput {
  title: string;
  description?: string | null;
  assignedTo: number;
  completedAt?: string | null;
  timeTaken?: number | null;
  deadline?: string | null;
  associatedProject: number;
  assignedby?: number;
}

export type UpdateTaskInput = Partial<CreateTaskInput>;
