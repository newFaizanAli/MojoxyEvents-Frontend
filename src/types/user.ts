export interface User {
  _id?: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  isActive: boolean;
  password?: string;
}

export type UserFormData = Omit<User, "_id">;
