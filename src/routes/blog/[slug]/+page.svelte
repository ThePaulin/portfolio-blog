<script lang="ts">
	import { onMount } from 'svelte';

	let { data }: { data: { post: { html: string } } } = $props();

	onMount(async () => {
		const { createHighlighter } = await import('shiki');
		
		const highlighter = await createHighlighter({
			themes: ['github-dark'],
			langs: ['javascript', 'typescript', 'html', 'css', 'svelte', 'json', 'bash', 'python', 'rust', 'go']
		});

		const codeBlocks = document.querySelectorAll('pre code');
		codeBlocks.forEach((block) => {
			const text = block.textContent || '';
			const langMatch = block.className.match(/language-(\w+)/);
			const lang = langMatch ? langMatch[1] : 'text';
			try {
				block.innerHTML = highlighter.codeToHtml(text, { lang, theme: 'github-dark' });
			} catch {
				// Keep original if highlighting fails
			}
		});
	});
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
