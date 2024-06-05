import FlexSearch from 'flexsearch'

let Index: FlexSearch.Document<{title:String, content:String, tags?:String[]},false>
let posts: any[]

export function createIndex(data: any[]) {
  // create the posts index
	Index = new FlexSearch.Document({ tokenize: 'forward', document:{
    index:["title", "content"],
    id: "id"
  }})

	data.forEach((post, id) => {
		const title: String =post.title
    const content: String= post.content
    const tags: String[] = post.tags
    // add the item to the index 👍️
		Index.add(id,{title ,content})
	})
  console.log(posts)
	posts = data
}
export function searchIndex(searchTerm: string) {
    // escape special regex characters
      const match = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    // return matching post indexes 💪
      const results = Index.search(match)
  
      return results
      // filter the posts based on the matched index
          .map((index) => posts[index.result[0] as number])
      // you can do whatever you want at this point 👌
          .map(({ slug, title, content }) => {
              return {
                  slug,
          // replace match in title with a marker
                  title: replaceTextWithMarker(title, match),
          // match words in post and replace matches with marker
                  content: getMatches(content, match),
              }
          })
  }
  function getMatches(text: string, searchTerm: string, limit = 1) {
	// create dynamic regex 😎
	const regex = new RegExp(searchTerm, 'gi')
  // word indexes
	const indexes = []
  // matches count
	let matches = 0
  // current match in loop
	let match

	while ((match = regex.exec(text)) !== null && matches < limit) {
	
    indexes.push(match.index)
		// increment matches
		matches++
	}

  // take the word index...
	return indexes.map((index) => {
    // go back 20 characters
		const start = index - 20
    // go forward 80 characters
		const end = index + 80
    // yoink the text
		const excerpt = text.substring(start, end).trim()
    // return excerpt 🤝
		return `...${replaceTextWithMarker(excerpt, searchTerm)}...`
	})
}

function replaceTextWithMarker(text: string, match: string) {
  // create dynamic regex 😎
	const regex = new RegExp(match, 'gi')
  // preserves the text casing 🤙
	return text.replaceAll(regex, (match) => `<mark>${match}</mark>`)
}
