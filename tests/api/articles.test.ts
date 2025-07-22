import request from 'supertest'

describe('Articles API', () => {
  const baseUrl = process.env.API_URL || 'http://localhost:1337'

  describe('GET /api/articles', () => {
    it('should return articles list', async () => {
      const response = await request(baseUrl)
        .get('/api/articles')
        .expect(200)

      expect(response.body).toHaveProperty('data')
      expect(Array.isArray(response.body.data)).toBe(true)
    })

    it('should return articles with correct structure', async () => {
      const response = await request(baseUrl)
        .get('/api/articles')
        .expect(200)

      if (response.body.data.length > 0) {
        const article = response.body.data[0]
        expect(article).toHaveProperty('id')
        expect(article).toHaveProperty('attributes')
        expect(article.attributes).toHaveProperty('title')
        expect(article.attributes).toHaveProperty('slug')
      }
    })
  })

  describe('GET /api/articles/:id', () => {
    it('should return 404 for non-existent article', async () => {
      await request(baseUrl)
        .get('/api/articles/999999')
        .expect(404)
    })

    it('should return article by id if exists', async () => {
      // Сначала получаем список статей
      const listResponse = await request(baseUrl)
        .get('/api/articles')
        .expect(200)

      if (listResponse.body.data.length > 0) {
        const firstArticle = listResponse.body.data[0]
        
        const response = await request(baseUrl)
          .get(`/api/articles/${firstArticle.id}`)
          .expect(200)

        expect(response.body.data.id).toBe(firstArticle.id)
        expect(response.body.data.attributes.title).toBe(firstArticle.attributes.title)
      }
    })
  })

  describe('GraphQL /graphql', () => {
    it('should return articles via GraphQL', async () => {
      const query = `
        query GetArticles {
          articles {
            data {
              id
              attributes {
                title
                slug
                content
                publishedAt
              }
            }
          }
        }
      `

      const response = await request(baseUrl)
        .post('/graphql')
        .send({ query })
        .expect(200)

      expect(response.body).toHaveProperty('data')
      expect(response.body.data).toHaveProperty('articles')
      expect(Array.isArray(response.body.data.articles.data)).toBe(true)
    })
  })
}) 