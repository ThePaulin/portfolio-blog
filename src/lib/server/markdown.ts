import matter from 'gray-matter';
import { marked } from 'marked';

export interface BlogPost {
	slug: string;
	title: string;
	date: string;
	description: string;
	content: string;
	html?: string;
}

export async function parseMarkdown(content: string): Promise<BlogPost> {
	const { data, content: markdown } = matter(content);
	
	const slug = data.slug || '';
	const title = data.title || 'Untitled';
	const date = data.date || '';
	const description = data.description || '';

	const html = await marked.parse(markdown);

	return {
		slug,
		title,
		date,
		description,
		content: markdown,
		html
	};
}

export function getPostSlug(filename: string): string {
	return filename.replace(/\.md$/, '');
}
