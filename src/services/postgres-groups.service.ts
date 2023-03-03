import { Group } from '../entity/group.entity';
import { GroupStoroge } from '../services/groups.service';
import { getConnection, getRepository, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../entity/user.entity';

export class PostgresGroupsService implements GroupStoroge {
  private groups: Repository<Group>;

  async findGroupByID(id: string): Promise<Group | undefined> {
    this.groups = getRepository(Group);
    return await this.groups.findOne({ where: { id: id } });
  }

  async getAllGroups(): Promise<Group[] | null> {
    this.groups = getRepository(Group);
    return await this.groups.find();
  }

  async createGroup(group: Group): Promise<Group | undefined> {
    this.groups = getRepository(Group);
    return await this.groups.save({ id: uuidv4(), ...group });
  }

  async deleteGroup(id: string): Promise<boolean> {
    this.groups = getRepository(Group);
    return (await this.groups.delete(id)) ? true : false;
  }

  async updateGroup(id: string, group: Omit<Group, 'id'>): Promise<Group | undefined> {
    this.groups = getRepository(Group);
    if (await this.groups.findOne(id)) {
      await this.groups.update(id, group);
      return { id: id, ...group };
    }
    return null;
  }

  async addUsersToGroup(idGroup: string, idUsers: string[]): Promise<Group | undefined> {
    this.groups = getRepository(Group);
    const group = await this.groups.findOne({ id: idGroup });
    group.users = [];

    for (const id of idUsers) {
      const isUser = await getRepository(User).findOne({ where: { id: id } });
      if (isUser) {
        group.users.push(isUser);
      } else {
        return null;
      }
    }
    return getConnection().transaction(async transactionalEntityManager => {
      return await transactionalEntityManager.save(group);
    });
  }
}
