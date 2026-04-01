import { fetchBlogFiles, fetchFileContent, type GitHubFile } from '$lib/server/github';
import { parseMarkdown, getPostSlug, type BlogPost } from '$lib/server/markdown';

export async function load(): Promise<{ posts: BlogPost[] }> {
	const files = await fetchBlogFiles();
	
	const posts: BlogPost[] = await Promise.all(
		files.map(async (file: GitHubFile) => {
			const content = await fetchFileContent(file.download_url);
			const post = await parseMarkdown(content);
			post.slug = getPostSlug(file.name);
			return post;
		})
	);

	posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return { posts };
}
