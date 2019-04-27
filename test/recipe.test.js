const request = require('supertest')
const app = require('../src/app')
const Recipe = require('../src/models/recipe')

test('Should create new recipe for user', async () => {
  const response = await request(app)
    .post('/recipe')
    .send({
      description: 'Fried Fish',
      foodType: "['snack']",
      cookTime: 30,
      prepTime: 10,
      ingredients: "['fish', 'seasoning']",
      rating: 2,
      serves: 2,
      directions: 'fry fish'
    })
    .expect(201)

  const recipe = await Recipe.findById(response.body._id)

  expect(recipe).not.toBeNull()
})
