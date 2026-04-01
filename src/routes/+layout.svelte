<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen bg-white">
	<nav class="border-b border-gray-200">
		<div class="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
			<a href="/" class="text-xl font-bold">ThePaulin</a>
			<div class="space-x-6">
				<a href="/" class="hover:text-blue-600">Home</a>
				<a href="/blog" class="hover:text-blue-600">Blog</a>
			</div>
		</div>
	</nav>

	{@render children()}
</div>
