import { Connection, createConnection } from 'typeorm';

export async function connectPostgres(): Promise<Connection> {
  return await createConnection();
}
