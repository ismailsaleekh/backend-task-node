import fetch from 'node-fetch';

/**
 * Fetches items from the Skinport API.
 * @returns A list of items from the Skinport API.
 * @throws Error if fetching the items fails.
 */
export async function getItems() {
    try {
        const response = await fetch('https://api.skinport.com/v1/items?app_id=730&currency=EUR');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const items = await response.json();

        return items;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error fetching items:', error.message);
        } else {
            console.error('Unknown error:', error);
        }

        throw new Error('Failed to fetch items');
    }
}
