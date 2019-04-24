import { Pool } from 'pg';
import dotenv from 'dotenv';
import Debug from 'debug';

import "@babel/polyfill";

dotenv.config();

const debug = Debug('dev');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export default class Model {
  constructor(table) {
    this.table = table;
    this.pool = pool;
    this.pool.on('error', err => debug('postgres')(err));
  }

  async select(params, constraint) {
    try {
      const result = await this.pool.query(
        `SELECT ${params} FROM ${this.table} WHERE ${constraint}`
      );
      debug(result.rows);
      return result.rows;
    } catch (err) {
      return debug(err.message);
    }
  }

  async create(params, values) {
    try {
      const result = await this.pool.query(
        `INSERT INTO ${this.table}(${params}) VALUES(${values}) RETURNING *`
      );
      return result.rows;
    } catch (err) {
      return debug(err.message);
    }
  }

  async update(params, constraints) {
    try {
      const result = await this.pool.query(
        `UPDATE ${this.table} SET ${params} WHERE ${constraints} RETURNING *`
      );
      debug(result.rows);
      return result.rows;
    } catch(err)  {
      reject(err);
  }
  }
  async delete(params, constraint) {
    try {
      const result = await this.pool.query(
        `DELETE FROM ${this.table} ${params} WHERE ${constraint}`
      );
      debug(result);
      return result;
    } catch (err) {
      return debug(err.message);
    }
  }

  async selectAll(params) {
    try {
      const result = await this.pool.query(`SELECT ${params} FROM ${this.table}`);
      debug(result.rows);
      return result.rows;
    } catch (err) {
      return debug(err.message);
    }
  }

}
