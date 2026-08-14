import * as bcrypt from 'bcrypt';
import dataSource from '../../config/data-source';
import { UserEntity } from '../../resources/user/entites/user.entity';

async function seed() {
  await dataSource.initialize();

  const userRepository = dataSource.getRepository(UserEntity);
  const existing = await userRepository.count();

  if (existing > 0) {
    console.log('[seed] users already exist, skipping');
    await dataSource.destroy();
    return;
  }

  const hashedPassword = await bcrypt.hash('password', 10);
  const now = new Date();

  await userRepository.save(
    userRepository.create({
      username: 'admin',
      email: 'admin@lapse.com',
      password: hashedPassword,
      createdAt: now,
      updatedAt: now,
    }),
  );

  console.log('[seed] demo user created: admin@lapse.com / password');

  await dataSource.destroy();
}

seed().catch((error) => {
  console.error('[seed] failed', error);
  process.exit(1);
});
