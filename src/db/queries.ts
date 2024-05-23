import { query } from './connection';

/**
 * Deducts the specified amount from the user's balance.
 * @param userId - The ID of the user.
 * @param amount - The amount to deduct.
 * @returns The updated user information.
 * @throws Error if the query fails.
 */
export async function deductUserBalance(userId: number, amount: number) {
    try {
        const result = await query('UPDATE users SET balance = balance - $1 WHERE id = $2 RETURNING *', [amount, userId]);

        if (result.rows.length === 0) {
            throw new Error('User not found');
        }
        
        return result.rows[0];
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error deducting user balance:', error.message);
        } else {
            console.error('Unknown error:', error);
        }
        
        throw new Error('Failed to deduct user balance');
    }
}
