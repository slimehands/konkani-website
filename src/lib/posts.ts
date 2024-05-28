import matter from 'gray-matter'
const patterns: Record<string, RegExp> = {
	frontmatter: /---.*?---/gs,
	code: /```.*?\n|```/gs,
	inline: /`([^`]*)`/g,
	heading: /^#{1,6}\s.*$/gm,
	link: /\[([^\]]+)\]\(([^)]+)\)/g,
	image: /\!\[.*?\]\(.*?\)/g,
	blockquote: /> /gm,
	bold: /\*\*/g,
	italic: /\b_([^_]+)_(?!\w)/g,
	special: /{%.*?%}/g,
	tags: /[<>]/g,
}

const htmlEntities: Record<string, string> = {
	'<': '&lt;',
	'>': '&gt;',
}
function stripMarkdown(markdown: string) {
	for (const pattern in patterns) {
		switch (pattern) {
			case 'inline':
				markdown = markdown.replace(patterns[pattern], '$1')
				break
			case 'tags':
				markdown = markdown.replace(
					patterns[pattern],
					(match) => htmlEntities[match]
				)
				break
			case 'link':
				markdown = markdown.replace(patterns[pattern], '$2')
				break
			case 'italic':
				markdown = markdown.replace(patterns[pattern], '$1')
				break
			default:
				markdown = markdown.replace(patterns[pattern], '')
		}
	}

	return markdown
}
export function files(){
    const paths = import.meta.glob('/src/routes/stories/story-files/*.svx', { query: '?raw', import: 'default', eager: true })
    const posts = Object.entries(paths)
        .map(([path, content]) => {
            const frontmatter = matter(content)
            if (frontmatter.data.draft) {
                return null
            }
            return {
                title: frontmatter.data.title,
                slug: path.slice(11, -4).replace("/story-files", ""),
                level: frontmatter.data.level,
                content: stripMarkdown(content),
            }
        })
        .filter(Boolean)
    return posts
}