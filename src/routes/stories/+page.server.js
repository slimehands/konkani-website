// @ts-nocheck
export async function load() {
	const allPostFiles = import.meta.glob('/src/routes/stories/story-files/*.svx');
	const iterablePostFiles = Object.entries(allPostFiles);

	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			const { metadata } = await resolver();
			const postPath = path.slice(11, -4).replace("/story-files", "");

			return {
				meta: metadata,
				path: postPath
			};
		})
	);

	return {posts: allPosts};
}