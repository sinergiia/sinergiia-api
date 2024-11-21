import { createClient } from '@libsql/client';
import dotenv from 'dotenv';

dotenv.config();

const DB_URL = process.env.NODE_ENV === 'production'
  ? process.env.DATABASE_URL || 'libsql://sinergiia-leads-bolt.turso.io'
  : 'file:local.db';

export const db = createClient({
  url: DB_URL,
  authToken: process.env.DB_TOKEN
});