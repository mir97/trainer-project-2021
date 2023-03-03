import * as Joi from 'joi';
import { Group } from 'type/groups.type';
import { User } from '../type/users.type';

export const isValidateUser = (user: Omit<User, 'id'>): any => {
  return Joi.object({
    login: Joi.string()
      .alphanum()
      .required(),
    age: Joi.number()
      .min(4)
      .max(130)
      .required(),
    password: Joi.string()
      .alphanum()
      .pattern(/^(\d+[a-zA-Z]|[a-zA-Z]+\d)(\d|[a-zA-Z])*/)
      .min(8)
      .max(30)
      .required(),
    isDeleted: Joi.boolean().required(),
  }).validate(user);
};

export const isValidateGroup = (group: Omit<Group, 'id'>): any => {
  return Joi.object({
    name: Joi.string()
      .alphanum()
      .required(),
    permissions: Joi.required(),
  }).validate(group);
};
