import bcrypt from 'bcryptjs';
import { UserRepository } from '../data/repositories/userRepository';

export const createDefaultUser = async (): Promise<void> => {
  const adminUsername = 'admin';
  const adminPassword = 'admin';

  // Verificar si el usuario "admin" ya existe
  const existingUser = await UserRepository.findByUsername(adminUsername);

  if (!existingUser) {
    // Encriptar la contraseña usando bcrypt
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Crear un nuevo usuario con los datos predeterminados
    const defaultUser = await UserRepository.createUser({
      username: adminUsername,
      password: hashedPassword,
      firstName: 'Requirement System',
      lastName: 'ReqWizard',
      isActive: true,
    });

    console.log('Default user created:', defaultUser.username, '/', adminPassword);
  } else {
    console.log('Default user already exists');
  }
};
