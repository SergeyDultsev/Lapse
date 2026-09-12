import { Injectable } from '@nestjs/common';
import { UserEntity } from '@resources/user/entites/user.entity';
import * as bcrypt from 'bcrypt';
import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

@Injectable()
export class UsersSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const userRepository = dataSource.getRepository(UserEntity);
    const existing = await userRepository.count();

    if (existing > 0) {
      await dataSource.destroy();
      return;
    }

    const hashedPassword = await bcrypt.hash('password', 10);
    const now = new Date();

    const users = [
      {
        username: 'sergey_dulstev',
        email: 'admin@lapse.com',
        bio: 'SEO Lapse',
      },
      {
        username: 'richard_hendricks',
        email: 'richard@lapse.com',
        bio: 'CEO of Pied Piper. Compression is my life.',
      },
      {
        username: 'erlich_bachman',
        email: 'erlich@lapse.com',
        bio: 'Aviato founder. Technically, I am a billionaire.',
      },
      {
        username: 'dinesh_chugtai',
        email: 'dinesh@lapse.com',
        bio: 'Best coder at Pied Piper. Definitely not Gilfoyle.',
      },
      {
        username: 'bertram_gilfoyle',
        email: 'gilfoyle@lapse.com',
        bio: 'Systems architect. Satanist. LaVeyan, to be precise.',
      },
      {
        username: 'jared_dunn',
        email: 'jared@lapse.com',
        bio: 'Operations at Pied Piper. Former Hooli employee.',
      },
      {
        username: 'monica_hall',
        email: 'monica@lapse.com',
        bio: 'Partner at Raviga Capital.',
      },
      {
        username: 'big_head',
        email: 'bighead@lapse.com',
        bio: 'Just a guy who was at the right place at the right time.',
      },
      {
        username: 'gavin_belson',
        email: 'gavin@lapse.com',
        bio: 'CEO of Hooli. Making the world a better place.',
      },
      {
        username: 'jian_yang',
        email: 'jianyang@lapse.com',
        bio: 'Not hotdog.',
      },
      {
        username: 'russ_hanneman',
        email: 'russ@lapse.com',
        bio: 'This guy fucks. Billionaire investor.',
      },
      {
        username: 'laurie_bream',
        email: 'laurie@lapse.com',
        bio: 'Managing partner at Raviga Capital.',
      },
    ];

    await userRepository.save(
      users.map((user) =>
        userRepository.create({
          ...user,
          password: hashedPassword,
          createdAt: now,
          updatedAt: now,
        }),
      ),
    );
  }
}
