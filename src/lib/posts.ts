import matter from 'gray-matter'
import strip from 'strip-markdown-oneline'
export function files(){
    const paths = import.meta.glob('/src/routes/articles/content/*.svx', { query: '?raw', import: 'default', eager: true })
    const posts = Object.entries(paths)
        .map(([path, content]) => {
            const frontmatter = matter(content)
            if (frontmatter.data.draft) {
                return null
            }
            return {
                title: frontmatter.data.title,
                slug: path.slice(11, -4).replace("/content", ""),
                level: frontmatter.data.level,
                content: strip(content),
            }
        })
        .filter(Boolean)
    return posts
}