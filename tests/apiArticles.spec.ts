import { test } from '../api/fixtures'
import { expect } from '@playwright/test'
import { validateSchema } from '../api/schema-validator'


let authToken: string

test.beforeAll('Login API', async({api}) => {
    const tokenResponse = await api
        .path('/users/login')
        .body({"user":{"email":"pwapiuser@test.com", "password": "Welcome"}})
        .postRequest(200)
    
    authToken = 'Token ' + tokenResponse.user.token
})

test('Get test tags', async({api}) => {
    const response = await api
        .path('/tags')
        .getRequest(200)

    await validateSchema('getTags', 'GET_tags', response)
    expect(response.tags.length).toBeLessThanOrEqual(10)
})

test('Get all articles', async({api}) => {
    const response = await api
        .path('/articles')
        .params({limit: 10, offset: 0})
        .getRequest(200)

    await validateSchema('allArticles', 'GET_articles', response)
    expect(response.articlesCount).toEqual(10)
})

test('Update an article', async ({api}) => {
    const newArticleResponse = await api
        .path('/articles')
        .body({
            "article": {
                "title": "This is a new article",
                "description": "Article description",
                "body": "Aricle body",
                "tagList": []
            }
        })
        .headers({Authorization: authToken})
        .postRequest(201)

    const slugId = newArticleResponse.article.slug

    const updateArticleResponse = await api
        .path(`/articles/${slugId}`)
        .body({
            "article": {
                "title": "This article was updated",
                "description": "Article description",
                "body": "Aricle body",
                "tagList": []
            }
        })
        .headers({Authorization: authToken})
        .putRequest(200)
    
    await validateSchema('updateArticle', 'PUT_article', updateArticleResponse)
    expect(updateArticleResponse.article.title).toEqual('This article was updated')

    const newSlugId = updateArticleResponse.article.slug

    await api
        .path(`/articles/${newSlugId}`)
        .headers({Authorization: authToken})
        .deleteRequest(204)
});



test('Create a new article', async ({api}) => {
    const newArticleResponse = await api
        .path('/articles')
        .body({
            "article": {
                "title": "Article test",
                "description": "Article description",
                "body": "Aricle body",
                "tagList": []
            }
        })
        .headers({Authorization: authToken})
        .postRequest(201)

    await validateSchema('createArticle', 'POST_article', newArticleResponse)
    expect(newArticleResponse.article.title).toEqual('Article test')

    const slugId = newArticleResponse.article.slug
    await api
        .path(`/articles/${slugId}`)
        .headers({Authorization: authToken})
        .deleteRequest(204)
});


test('Delete an article', async ({api}) => {
    const newArticleResponse = await api
        .path('/articles')
        .body({
            "article": {
                "title": "Article will be deleted",
                "description": "Article description",
                "body": "Aricle body",
                "tagList": []
            }
        })
        .headers({Authorization: authToken})
        .postRequest(201)

    expect(newArticleResponse.article.title).toEqual('Article will be deleted')

    const slugId = newArticleResponse.article.slug
    await api
        .path(`/articles/${slugId}`)
        .headers({Authorization: authToken})
        .deleteRequest(204)
});
