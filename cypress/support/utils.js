// support/utils.js

import faker from 'faker';

export const generateFakeData = () => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    // Add more fields as needed
  };
};