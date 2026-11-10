export interface Department {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDepartmentInput {
  name: string;
  description: string;
}

export type UpdateDepartmentInput = Partial<CreateDepartmentInput>;
