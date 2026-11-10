export interface Project {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  createdBy: number;
  completedAt: string | null;
  status: string;
  deadline: string | null;
  updatedAt: string;
}

export interface CreateProjectInput {
  name: string;
  description: string;
  status: string;
  completedAt?: string | null;
  deadline?: string | null;
}

export type UpdateProjectInput = Partial<CreateProjectInput>;