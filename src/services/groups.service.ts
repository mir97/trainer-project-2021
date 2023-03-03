import { Group } from '../type/groups.type';

export interface GroupStoroge {
  createGroup: (group: Group) => Promise<Group>;
  updateGroup: (id: string, group: Omit<Group, 'id'>) => Promise<Group>;
  findGroupByID: (id: string) => Promise<Group>;
  deleteGroup: (id: string) => void;
  getAllGroups: () => Promise<Group[]>;
}
