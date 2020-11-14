import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateAppointments1605309674518 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [{
          name: 'id',

        },

        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }
}
