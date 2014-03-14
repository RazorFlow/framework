<meta>
{
    "title": "Something interesting"
}
</meta>
### This is the Level 2 root

This is body text. Link to level 1: <%- linkArticle('level1/document2') %>.

Link to root: <%- linkArticle('index') %>

This is viewing a partial: <%- partial('partial1', {foo: 'hello', 'bar': 'worldaaaah!! beeeeeeeesss!!'}) %>

To know more about using level 1, see <%- ref('level1usage') %>