export async function load({ params }) { 
	const post = await import(`../content/${params.slug}.svx`);
	const {level, title} =  post.metadata;
	const Content =  post.default;
	const slug =  params.slug;
	return {
		Content,
		level,
		title,
		slug
	};
	
	
}
