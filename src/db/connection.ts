import { Pool } from 'pg';

// Create a new PostgreSQL connection pool using environment variables.
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

/**
 * Executes a database query with the provided text and parameters.
 * @param text - The SQL query text.
 * @param params - The parameters for the SQL query.
 * @returns The result of the query.
 * @throws Error if the query execution fails.
 */
export async function query(text: string, params: any[]) {
    try {
        const res = await pool.query(text, params);

        return res;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error executing query:', error.message);
        } else {
            console.error('Unknown error:', error);
        }

        throw new Error('Failed to execute query');
    }
}
