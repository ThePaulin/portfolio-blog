const GITHUB_OWNER = 'ThePaulin';
const GITHUB_REPO = 'portfolio-blog';

const GITHUB_API = 'https://api.github.com';

export interface GitHubFile {
	name: string;
	path: string;
	download_url: string;
	content?: string;
}

export async function fetchBlogFiles(): Promise<GitHubFile[]> {
	const response = await fetch(
		`${GITHUB_API}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/content/blog`,
		{
			headers: {
				'Accept': 'application/vnd.github.v3+json'
			}
		}
	);

	if (!response.ok) {
		if (response.status === 404) {
			return [];
		}
		throw new Error(`Failed to fetch blog files: ${response.statusText}`);
	}

	const files = await response.json();
	return Array.isArray(files) ? files.filter((f: GitHubFile) => f.name.endsWith('.md')) : [];
}

export async function fetchFileContent(downloadUrl: string): Promise<string> {
	const response = await fetch(downloadUrl);
	if (!response.ok) {
		throw new Error(`Failed to fetch file content: ${response.statusText}`);
	}
	return response.text();
}
