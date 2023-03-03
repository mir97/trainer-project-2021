import { User } from '../entity/user.entity';
import { getRepository, Repository } from 'typeorm';

export class PostgresAuthService {
  private users: Repository<User>;

  async login(user): Promise<User | null> {
    this.users = getRepository(User);
    const resultUser = await this.users.findOne({
      where: { login: user.login, password: user.password },
    });
    return resultUser;
  }
}
