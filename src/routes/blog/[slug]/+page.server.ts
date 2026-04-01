import { fetchBlogFiles, fetchFileContent, type GitHubFile } from '$lib/server/github';
import { parseMarkdown, getPostSlug, type BlogPost } from '$lib/server/markdown';
import { error } from '@sveltejs/kit';

export async function load({ params }: { params: { slug: string } }): Promise<{ post: BlogPost }> {
	const files = await fetchBlogFiles();
	
	for (const file of files) {
		const slug = getPostSlug(file.name);
		if (slug === params.slug) {
			const content = await fetchFileContent(file.download_url);
			const post = await parseMarkdown(content);
			post.slug = slug;
			return { post };
		}
	}

	throw error(404, 'Post not found');
}
