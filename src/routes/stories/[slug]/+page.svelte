<script>
	// @ts-ignore
	export let data;
	const { title, level, Content, slug} = data;
</script>

<article>
	<h1>{title}</h1>
	<p>level: {level}</p>
	<Content />
	<a href={slug}>link</a>
</article>