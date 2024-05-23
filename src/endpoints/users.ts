import { deductUserBalance } from '../db/queries';

/**
 * Updates the user balance by deducting the specified amount.
 * @param userId - The ID of the user.
 * @param amount - The amount to deduct from the user's balance.
 * @returns The updated user information.
 * @throws Error if updating the user balance fails.
 */
export async function updateUserBalance(userId: number, amount: number) {
    try {
        const result = await deductUserBalance(userId, amount);
        
        if (!result) {
            throw new Error('User not found');
        }

        return result;
    } catch (error) {
        
        if (error instanceof Error) {
            console.error('Error updating user balance:', error.message);
        } else {
            console.error('Unknown error:', error);
        }
        
        throw new Error('Failed to update user balance');
    }
}
