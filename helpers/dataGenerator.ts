import { faker } from '@faker-js/faker';

export const generateCarRentalSearch = () => ({
  location: faker.helpers.arrayElement([
    'New York',
    'Los Angeles',
    'Chicago',
    'Miami',
  ]),
});

export const generateDriverAge = () => ({
  valid: faker.number.int({ min: 18, max: 65 }),
  underage: faker.number.int({ min: 1, max: 17 }),
  boundary: 18,
  negative: faker.number.int({ min: -10, max: -1 }),
});

export const generateApiObject = () => ({
  name: `${faker.commerce.productName()} - ${faker.string.alphanumeric(6)}`,
  data: {
    year: faker.number.int({ min: 2018, max: 2024 }),
    price: parseFloat(faker.commerce.price({ min: 500, max: 5000 })),
    CPU: faker.helpers.arrayElement(['Apple M3', 'Intel i7', 'AMD Ryzen 9']),
    RAM: faker.helpers.arrayElement(['8 GB', '16 GB', '32 GB']),
  },
});