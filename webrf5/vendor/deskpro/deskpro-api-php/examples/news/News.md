Search for news matching criteria
--------------------------------------

    $criteria = $api->news->createCriteria();

    $criteria->addCategory(1)
            ->createdBefore($unixTimestamp)
            ->addLabel('label text')
            ->addStatus($status);

    $result = $api->news->find($criteria);

Creates a new news item
--------------------------------------

    $builder = $api->news->createNewsEditor();

    $builder->setTitle("This is the title")
            ->setContent("News Content goes here")
            ->addLabel("API")
            ->addCategory(1);

    $result = $api->news->save($builder);

Gets information about a news item
-----------------------------------

    $result = $api->news->findById(3);

Updates a news item
-----------------------------------

    $builder = $api->news->createArticleEditor();

    $builder->setId(3)->setTitle("Article updated by API");

    $result = $api->news->save($builder);

Deletes a news item
-----------------------------------

    $result = $api->news->deleteById(3);

Gets all comments on a news item.
-----------------------------------

    $result = $api->news->getArticleComments(4);

Adds a comment to a news item.
-----------------------------------
    
    $newsId = 4;
    $personId = 4;

    $result = $api->news->addArticleComment($newsId, 'Comment added via API', $personId);

Gets a specific comment on a news item.
-------------------------------------

    $newsId = 4;
    $commentId = 2;
    $result = $api->news->getArticleComment($newsId, $commentId);

Updates a specific comment on a news item.
--------------------------------------

    $newsId = 4;
    $commentId = 2;
    $result = $api->news->updateArticleComment($newsId, $commentId, 'New Comment Content');

Deletes a specific comment on a news item.
-----------------------------------

    $newsId = 4;
    $commentId = 2;
    $result = $api->news->deleteArticleComment($newsId, $commentId);

Gets all labels associated with a news item.
-----------------------------------

    $newsId      = 4;
    $result = $api->news->getArticleLabels($newsId);

Adds a label to a news item.
-----------------------------------

    $newsId      = 4;
    $result = $api->news->addArticleLabel($newsId, 'label text here');

Determines if a news item has a specific label.
------------------------------------

    $newsId      = 4;
    $result = $api->news->getArticleLabel($newsId, 'label text');

Removes a label from a news item.
------------------------------------

    $newsId      = 4;
    $result = $api->news->removeArticleLabel($newsId, 'label text');

Gets a list of article comments awaiting validation.
------------------------------------

    $result = $api->news->getValidatingComments();

Gets a list of news categories.
------------------------------------

    $result = $api->news->getCategories();

Creates a news item category.
------------------------------------

    $title = 'Article Title';
    $parentId = 1;
    
    $result = $api->news->createCategory($title, $parentId);

Gets a news item category.
------------------------------------

    $categoryId = 1;
    
    $result = $api->news->getCategory($categoryId);

Updates a news item category.
------------------------------------
    
    $categoryId = 1;
    $title = 'Updated Title';
    $parentId = 2;
    
    $result = $api->news->updateCategory($categoryId, $title, $parentId);

Deletes a news item category.
------------------------------------

    $categoryId = 1;
    
    $result = $api->news->deleteCategoryById($categoryId);

Gets news in a news item category.
------------------------------------

    $categoryId = 1;
    $page = 1;
    
    $result = $api->news->getCategoryArticles($categoryId, $page);

Gets all groups that can access a news item category.
------------------------------------

    $categoryId = 1;
    
    $result = $api->news->getCategoryGroups($categoryId);

Adds a group to a news item category.
------------------------------------
    
    $categoryId = 1;
    $groupId    = 1;

    $result = $api->news->addCategoryGroup($categoryId, $groupId);

Determines if a particular group ID exists for a news item category.
------------------------------------

    $categoryId = 1;
    $groupId    = 1;

    $result = $api->news->getCategoryGroup($categoryId, $groupId);

Removes a group's access to a news item category
------------------------------------

    $categoryId = 1;
    $groupId    = 1;

    $result = $api->news->deleteCategoryGroup($categoryId, $groupId);