import { IncomingMessage } from 'http';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { StringDecoder } from 'string_decoder';

const pipelineAsync = promisify(pipeline);

/**
 * Utility function to get the request body as a string.
 * @param req - The HTTP request object.
 * @returns A promise that resolves to the request body string.
 */
export async function getRequestBody(req: IncomingMessage): Promise<string> {
    const decoder = new StringDecoder('utf-8');
    let body = '';

    await pipelineAsync(
        req,
        async function* (source) {
            for await (const chunk of source) {
                body += decoder.write(chunk);
            }
            body += decoder.end();
        }
    );

    return body;
}
