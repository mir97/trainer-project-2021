import { User } from '../type/users.type';

export interface UserStoroge {
  createUser: (user: Omit<User, 'id'>) => Promise<User>;
  updateUser: (id: string, user: Omit<User, 'id'>) => Promise<User>;
  findUserByID: (id: string) => Promise<User>;
  deleteUser: (id: string) => void;
  getAutoSuggestUsers: (subStr: string, userLimit: number) => void;
}
