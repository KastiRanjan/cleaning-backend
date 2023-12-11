import { MigrationInterface, QueryRunner } from 'typeorm';

import db from '../config/ormconfig';
import { Mail } from '../entities/mail';

export class SeedEmailInfo1590519635114 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    let mail = new Mail();
    const userTypeRepository = db.getRepository(Mail);

    mail = new Mail();
    mail.logo = '/logo';
    mail.mailInfo = 'angelus.mail.info';
    mail.address = 'address';
    mail.facebook = 'https://facebook.com';
    mail.instagram = 'https://instagram.com';
    mail.linkedIn = 'https://linkedin.com';
    mail.twitter = 'https://twitter.com';
    mail.mapUrl = 'https://googlemap.com';
    await userTypeRepository.save(mail);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    console.log('Not implemented');
  }
}
