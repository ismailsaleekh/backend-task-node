import http from 'http';
import { getItems } from './endpoints/items';
import { updateUserBalance } from './endpoints/users';
import { getRequestBody } from './utils';

/**
 * Handles requests to fetch items from the Skinport API.
 * @param res - The HTTP response object.
 */
async function handleGetItems(res: http.ServerResponse) {
    try {
        const items = await getItems();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(items));

    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to fetch items' }));
    }
}

/**
 * Handles requests to update the user balance.
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 */
async function handleUpdateUserBalance(req: http.IncomingMessage, res: http.ServerResponse) {
    try {
        const body = await getRequestBody(req);

        const { userId, amount } = JSON.parse(body);
        const result = await updateUserBalance(userId, amount);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
    } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid request data' }));
    }
}

// Create the HTTP server
const server = http.createServer((req, res) => {
    if (req.url === '/items' && req.method === 'GET') {
        handleGetItems(res);
    } else if (req.url === '/user/balance' && req.method === 'POST') {
        handleUpdateUserBalance(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

// Start the server and listen on port 3000
server.listen(3000, () => {
    console.log('Server running at port 3000');
});
