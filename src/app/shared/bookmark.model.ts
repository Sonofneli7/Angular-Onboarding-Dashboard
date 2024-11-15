// bookmark.model.ts
import { v4 as uuidv4 } from 'uuid';

export class Bookmark {
    id: string;
    name: string;
    url: URL;
    favicon?: string;

    constructor(name: string, url: string, favicon?: string) {
        this.id = uuidv4();

        try {
            this.url = new URL(url);
        } catch (e) {
            console.error(`Invalid URL: ${url}`, e);
            this.url = new URL('https://default-url.com');
        }

        // Assign a default name if none is provided
        this.name = name || this.url.hostname;

        this.favicon = favicon;
    }
}
