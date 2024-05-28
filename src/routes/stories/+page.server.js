// @ts-nocheck
import { files } from "$lib/posts";
export async function load() {
	return { posts:files() }
}