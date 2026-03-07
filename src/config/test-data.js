export const users = {
  standard: { 
    username: process.env.STANDARD_USER_USERNAME,
    password: process.env.STANDARD_USER_PASSWORD
  },
  locked: { 
    username: process.env.LOCKED_USER_USERNAME,
    password: process.env.LOCKED_USER_PASSWORD
  },
  problem: { 
    username: process.env.INVALID_USER_USERNAME,
    password: process.env.INVALID_USER_PASSWORD
  },
};