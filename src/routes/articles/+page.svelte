stories!
storylist:<br/>
<script>
// @ts-nocheck

    export let data
    let {posts} = data
    console.log(posts)
</script>
{#each posts as post}
    <a href={post.slug}><h2>{post.title}</h2></a>
    level: {post.level}<br/>
{/each}