import { Group } from 'type/groups.type';
import { v4 as uuidv4 } from 'uuid';

export class InMemoryGroupService {

  constructor( private groups: Group[] = [ {
    id: "1",
    name: "test",
    permissions: ['READ']
  }]) {}

  findGroupByID = (id: string): Group => {
    const group = this.groups.find(x => x.id === id);
    return group ? group : null;
  };

  createGroup = (body: Omit<Group, 'id'>): Group => {
    const newGroup = { id: uuidv4(), ...body };
    this.groups.push(newGroup);
    return newGroup;
  };

  deleteGroup = (id: string): boolean => {
    const group = this.groups.find(x => x.id === id);
    this.groups = this.groups.filter(x => x.id !== id);
    return group ? true : false;
  };

  updateGroup = (id: string, body: Omit<Group, 'id'>): Group | false => {
    if (body) {
      const index = this.groups.findIndex(x => x.id === id);
      this.groups[index] = { id: id, ...body };
      return this.groups[index];
    }
    return false;
  };

  getAllGroups = (): Group[] =>{
    return this.groups;
  }
}
