<meta>
{
	"title": "Level 1 Root"
}
</meta>
### This is the Level 1 root

This is body text. Link to doc 2: <%- linkArticle('level1/document2') %>. Link to itself: <%- linkArticle('level1/index') %>.

<%- anchor('level1usage', 'Level 1 Usage') %>

<%- anchor('level1usageex', 'Level 1 Usage Ex') %>

### Using Level 1

This is an embedded example:

<%- embedExample('ex1') %>

You should be able to use this function: <%- linkApi('Class1', 'example1') %>

