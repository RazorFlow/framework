--
title: "Level 2 Root"
id: "level2"
index: 1
--
### This is the Level 2 root

This is body text. Link to level 1: <%- linkArticle('document2') %>.

Link to root: <%- linkArticle('root') %>

This is viewing a partial: <%- partial('partial1', {foo: 'hello', 'bar': 'worldaaaah!! beeeeeeeesss!!'}) %>

To know more about using level 1, see <%- ref('level1usage') %>