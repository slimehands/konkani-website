<script lang="ts">

	import { onMount } from 'svelte'
	import { createIndex, searchIndex } from '$lib/search'

	let search: 'loading' | 'ready' = 'loading'
	let searchTerm = ''
	let results: any[] = []

	onMount(async () => {
    // get the posts
		const posts = await fetch('/search.json').then((res) => res.json())
		// create search index
    createIndex(posts)
    // we're in business 🤝
		search = 'ready'
	})

	$: if (search === 'ready') {
    // runs each time `searchTerm` updates
		results = searchIndex(searchTerm)
	}
</script>

{#if search === 'ready'}
	<div class="search">
		<input
			bind:value={searchTerm}
			placeholder="Search"
			autocomplete="off"
			spellcheck="false"
			type="search"
		/>

		<div class="results">
			{#if results}
				<ul>
					{#each results as result}
						<li>
							<a href="{result.slug}">
								{@html result.title}
							</a>
							<p>{@html result.content}</p>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
{/if}
