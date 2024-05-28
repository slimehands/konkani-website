stories!
storylist:<br/>
<script>
    export let data
    let {posts} = data
</script>
{#each posts as post}
    <a href={post.path}><h2>{post.meta.title}</h2></a>
    level: {post.meta.level}<br/>
    
{/each}