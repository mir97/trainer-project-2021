import { User } from '../entity/user.entity';
import { UserStoroge } from '../services/users.service';
import { getRepository, Repository, Like } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { DEFAULT_LIMIT } from '../utils/constants';

export class PostgresUsersService implements UserStoroge {
  private users: Repository<User>;

  async findUserByID(id: string): Promise<User | undefined> {
    this.users = getRepository(User);
    return await this.users.findOne({ where: { id: id, isDeleted: false } });
  }

  async createUser(user: User): Promise<User | undefined> {
    this.users = getRepository(User);
    return await this.users.save({ id: uuidv4(), ...user });
  }

  async deleteUser(id: string): Promise<boolean> {
    this.users = getRepository(User);
    const user = await this.users.findOne(id);
    if (user) {
      user.isDeleted = true;
      await this.users.update(id, user);
      return true;
    }
    return false;
  }

  async updateUser(id: string, user: Omit<User, 'id'>): Promise<User | undefined> {
    this.users = getRepository(User);
    if (await this.users.findOne(id)) {
      await this.users.update(id, user);
      return { id: id, ...user };
    }
    return null;
  }

  async getAutoSuggestUsers(
    loginSubstring: string | undefined,
    userLimit: number,
  ): Promise<User[] | undefined> {
    this.users = getRepository(User);
    const limit = userLimit ? userLimit : undefined;
    const sortUser = await this.users.find({
      where: {
        login: Like(`%${loginSubstring ? loginSubstring : ''}%`),
        isDeleted: false,
      },
      take: limit ? limit : DEFAULT_LIMIT,
    });
    return sortUser;
  }
}
