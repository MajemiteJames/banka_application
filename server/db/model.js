import { Pool } from 'pg';
import dotenv from 'dotenv';
import Debug from 'debug';
import "@babel/polyfill";

dotenv.config();

const debug = Debug('dev');

export default class Model {
  constructor(table) {
    this.table = table;
    this.pool = Model.initConn();
    this.pool.on('error', err => console.log(err));
  }

  async select(params, constraint) {
    try {
      const result = await this.pool.query(
        `SELECT ${params} FROM ${this.table} WHERE ${constraint}`
      );
      console.log(result.rows);
      return result.rows;
    } catch (err) {
      return console.log(err.message);
    }
  }

  async create(params, values) {
    try {
      const result = await this.pool.query(
        `INSERT INTO ${this.table}(${params}) VALUES(${values}) RETURNING *`
      );
      console.log(result.rows);
      return result.rows;
    } catch (err) {
      return console.log(err.message);
    }
  }

  async update(params, constraints) {
    try {
      const result = await this.pool.query(
        `UPDATE ${this.table} SET ${params} WHERE ${constraints} RETURNING *`
      );
      console.log(result.rows);
      return result.rows;
    } catch (err) {
      return console.log(err.message);
    }
  }

  async delete(params, constraint) {
    try {
      const result = await this.pool.query(
        `DELETE FROM ${this.table} ${params} WHERE ${constraint}`
      );
      console.log(result);
      return result;
    } catch (err) {
      return console.log(err.message);
    }
  }

  async selectAll(params) {
    try {
      const result = await this.pool.query(`SELECT ${params} FROM ${this.table}`);
      console.log(result.rows);
      return result.rows;
    } catch (err) {
      return console.log(err.message);
    }
  }

  static initConn() {
    const { USER, HOST, DATABASE, PASSWORD, DB_PORT } = process.env;
    const poolSettings = {
      user: USER,
      host: HOST,
      password: PASSWORD,
      database: DATABASE,
      port: DB_PORT
    };

    debug(`Pool Settings: ${JSON.stringify(poolSettings)}`);
    return new Pool(poolSettings);
  }
}
