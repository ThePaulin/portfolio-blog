<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.post.title} | ThePaulin</title>
	<meta name="description" content={data.post.description} />
</svelte:head>

<article class="max-w-3xl mx-auto px-4 py-12">
	<header class="mb-8">
		<a href="/blog" class="text-blue-600 hover:underline mb-4 block">&larr; Back to Blog</a>
		<h1 class="text-4xl font-bold">{data.post.title}</h1>
		<p class="text-gray-500 mt-2">{data.post.date}</p>
	</header>

	<div class="prose prose-lg max-w-none">
		{@html data.post.html}
	</div>
</article>
