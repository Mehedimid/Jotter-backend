export interface IUser {
  name: string;
  email: string;
  password:string;
  age?: number;
  photo?: string | null;
  role: 'user' | 'admin';
  userStatus: 'active' | 'inavtive';
  }