import { User } from '../type/users.type';
import { DEFAULT_LIMIT } from '../utils/constants';
import { v4 as uuidv4 } from 'uuid';

export class InMemoryUserService {
  constructor(
    private users: User[] = [
      {
        id: '1',
        login: 'valera',
        password: '32ggfn',
        age: 12,
        isDeleted: false,
      },
      {
        id: '2',
        login: 'artem',
        password: '45654n',
        age: 12,
        isDeleted: false,
      },
      {
        id: '3',
        login: 'nikita',
        password: '45654n',
        age: 12,
        isDeleted: false,
      },
    ],
  ) {}

  findUserByID = (id: string): User => {
    const user = this.users.find(x => x.id === id && x.isDeleted === false);
    return user ? user : null;
  };

  createUser = (body: Omit<User, 'id'>): User => {
    const newUser = { id: uuidv4(), ...body };
    this.users.push(newUser);
    return newUser;
  };

  deleteUser = (id: string): boolean => {
    const index = this.users.findIndex(x => x.id === id);
    this.users[index].isDeleted = true;
    return index ? true : false;
  };

  updateUser = (id: string, body: Omit<User, 'id'>): User| false => {
    if (body) {
      const indexUser = this.users.findIndex(x => x.id === id);
      this.users[indexUser] = { id: id, ...body };
      return this.users[indexUser];
    }
    return false;
  };

  getAllUser = (subStr: string, userLimit: number):  User[] => {
    const limit = userLimit ? userLimit : undefined;
    const resultArray = this.users.filter(el => (subStr?new RegExp(`${subStr}`).test(el.login): true) && el.isDeleted !== true).sort((a,b) => a.login > b.login ? 1 : -1);
    return limit ? resultArray.slice(0, userLimit) : resultArray.slice(0, DEFAULT_LIMIT);
  };

}
