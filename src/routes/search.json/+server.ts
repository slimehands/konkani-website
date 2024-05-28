import { json } from '@sveltejs/kit'
export const prerender = true
import { files } from '$lib/posts';

export async function GET() {
    let posts = files()
    return json(posts);
}


