import matter from 'gray-matter';
import { marked, type Tokens } from 'marked';
import { createHighlighter } from 'shiki';

export interface BlogPost {
	slug: string;
	title: string;
	date: string;
	description: string;
	content: string;
	html?: string;
}

let highlighter: Awaited<ReturnType<typeof createHighlighter>> | null = null;

async function getHighlighter() {
	if (!highlighter) {
		highlighter = await createHighlighter({
			themes: ['github-dark'],
			langs: ['javascript', 'typescript', 'html', 'css', 'svelte', 'json', 'bash', 'python', 'rust', 'go']
		});
	}
	return highlighter;
}

export async function parseMarkdown(content: string): Promise<BlogPost> {
	const { data, content: markdown } = matter(content);
	
	const slug = data.slug || '';
	const title = data.title || 'Untitled';
	const date = data.date || '';
	const description = data.description || '';

	const hl = await getHighlighter();

	const renderer = {
		code(token: Tokens.Code): string {
			try {
				return hl.codeToHtml(token.text, { lang: token.lang || 'text', theme: 'github-dark' });
			} catch {
				return `<pre><code>${token.text}</code></pre>`;
			}
		}
	};

	const html = await marked.parse(markdown, { renderer });

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
