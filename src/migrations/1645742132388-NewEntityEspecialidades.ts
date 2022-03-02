import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class NewEntityEspecialidades1645742132388 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name :'especialidades',
            columns:[
                {
                    name :'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuidv4_generate_b4()'
                },
                {
                    name : 'nameEspecialidade',
                    type: 'varchar(255)',  
                },
                {
                    name : 'created_at',
                    type: 'timestamp',
                    default : 'now()',
                },
                {
                    name : 'update_at',
                    type: 'timestamp',
                    default : 'now()',
                },
            ]
        }))

        await queryRunner.query('INSERT INTO especialidades (nameEspecialidade) VALUES ("Alergologia", "Angiologia", "Buco maxilo", "Cardiologia clínca", "Cardiologia infantil", "Cirurgia cabeça e pescoço", "Cirurgia cardíaca", "Cirurgia de tórax")')
        
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
