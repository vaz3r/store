import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const DBConnection = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT !== undefined ? parseInt(process.env.DB_PORT) : 5432,
});

export const Query = async (QueryString: string): Promise<Object | any> => {
    try {
        return await DBConnection.query(QueryString);
    } catch (error) {
        console.log(QueryString);
        console.log(error);
        return error;
    }
};