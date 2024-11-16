// backend/src/data/repositories/userRepository.ts
import { AppDataSource } from '../../config/data-source';
import { User } from '../entities/User';

const userRepository = AppDataSource.getRepository(User);

export const UserRepository = {
  findByUsername: async (username: string) => {
    return await userRepository.findOneBy({ username });
  },
  createUser: async (userData: Partial<User>) => {
    const user = userRepository.create(userData);
    return await userRepository.save(user);
  },
};
