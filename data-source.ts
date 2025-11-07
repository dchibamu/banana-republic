import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'ngoni',
  password: 'zvamafunga-ndizvozvo',
  database: 'mafungiro-akasiyana',
  synchronize: true,
  logging: true,
});
