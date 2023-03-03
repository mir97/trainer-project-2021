import { Permission } from '../type/permissions.type';
export type Group = {
  id: string;
  name: string;
  permissions: Array<Permission>;
};
