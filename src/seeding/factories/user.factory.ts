import { User } from '../../entity/user.entity';
import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { v4 as uuidv4 } from 'uuid';

define(User, (faker: typeof Faker) => {
  const login = faker.random.alphaNumeric(10);
  const password = faker.random.alphaNumeric(10);
  const age = faker.random.number({
    min: 4,
    max: 130,
  });
  const isDeleted = faker.random.boolean();

  const user = new User();
  user.id = uuidv4();
  user.login = login;
  user.password = password;
  user.age = age;
  user.isDeleted = isDeleted;
  return user;
});
