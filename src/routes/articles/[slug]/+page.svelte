<script>
	// @ts-ignore
	export let data;
	const { title, level, Content, slug, tags} = data;
	console.log(data)
</script>

<article>
	<h1>{title}</h1>
	<p>level: {level}</p>
	<Content />
	{tags}
	<a href={slug}>link</a>
</article>