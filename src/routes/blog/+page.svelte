<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Blog | ThePaulin</title>
	<meta name="description" content="Thoughts on web development, coding, and technology." />
</svelte:head>

<div class="max-w-3xl mx-auto px-4 py-12">
	<h1 class="text-4xl font-bold mb-8">Blog</h1>
	
	{#if data.posts.length === 0}
		<p class="text-gray-600">No posts yet. Add markdown files to the blog folder!</p>
	{:else}
		<div class="space-y-8">
			{#each data.posts as post}
				<article class="border-b border-gray-200 pb-8">
					<a href="/blog/{post.slug}" class="block group">
						<h2 class="text-2xl font-semibold group-hover:text-blue-600 transition-colors">
							{post.title}
						</h2>
					</a>
					<p class="text-sm text-gray-500 mt-2">{post.date}</p>
					<p class="text-gray-600 mt-3">{post.description}</p>
				</article>
			{/each}
		</div>
	{/if}
</div>
