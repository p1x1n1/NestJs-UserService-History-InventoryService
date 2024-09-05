import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMillionUser1725525224605 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const numUsers =  1000000;
        const chunkSize = 10000; // Обработка данных порциями
        const insertQuery = `
        INSERT INTO "user"("firstName", "lastName", "age", "gender", "hasProblems")
        VALUES 
        `;
        
        let values: string[] = [];

        for (let i = 0; i < numUsers; i++) {
            const firstName = `FirstName${i}`;
            const lastName = `LastName${i}`;
            const age = Math.floor(Math.random() * 60) + 18;
            const gender = Math.random() > 0.5 ? 'male' : 'female';
            const hasProblems = Math.random() > 0.5;

            values.push(`('${firstName}', '${lastName}', ${age}, '${gender}', ${hasProblems})`);

            // вставка в базу chunkSize записей
            if (values.length >= chunkSize) {
                await queryRunner.query(insertQuery + values.join(','));
                values = []; 
            }
        }

        // оставшиеся записи
        if (values.length > 0) {
        await queryRunner.query(insertQuery + values.join(','));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "user" WHERE true`);
    }

}
