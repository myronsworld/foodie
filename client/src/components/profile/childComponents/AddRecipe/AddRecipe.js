import React, { Component } from 'react'
import Checkbox from '../AddRecipe/Checkbox'
import foodTypeCheckboxes from '../AddRecipe/foodTypeCheckboxes'
import ingredientsCheckboxes from '../AddRecipe/ingredientsCheckboxes'
import axios from 'axios'

class AddRecipe extends Component {
  constructor(props) {
    super(props)

    this.state = {
      recipeTitle: '',
      description: '',
      foodType: new Map(),
      cookTime: null,
      prepTime: null,
      ingredients: new Map(),
      serves: null,
      directions: ''
    }
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.handleIngredientsCheckboxChange = this.handleIngredientsCheckboxChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({ [name]: value })
  }

  handleCheckboxChange(event) {
    const target = event.target.name
    const isChecked = event.target.checked

    this.setState((prevState) => ({ foodType: prevState.foodType.set(target, isChecked) }))
  }

  handleIngredientsCheckboxChange(event) {
    const target = event.target.name
    const isChecked = event.target.checked

    this.setState((prevState) => ({ ingredients: prevState.ingredients.set(target, isChecked) }))
  }

  async handleSubmit(event) {
    event.preventDefault()
    try {
      const res = await axios({
        method: 'post',
        url: '/api/recipe',
        data: {
          title: 'Southern style fried shrimp',
          description: 'Fried Shrimp',
          foodType: "['snack']",
          cookTime: 10,
          prepTime: 10,
          ingredients: "['Shrimp', 'seasoning']",
          rating: 2,
          serves: 2,
          directions: 'fry shrimp'
        }
      })
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <section className="section">
        <div className="container is-fluid">
          <div className="columns">
            <div className="column">
              <h2>Add a new recipe</h2>
              <form onSubmit={this.handleSubmit}>
                <label>ADDITION</label>
                <div className="field">
                  <label className="label">Title</label>
                  <div className="control">
                    <input
                      className="input"
                      name="recipeTitle"
                      type="text"
                      value={this.state.value}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Description</label>
                  <div className="control">
                    <input
                      className="input"
                      name="description"
                      type="text"
                      value={this.state.value}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    {foodTypeCheckboxes.map((item) => (
                      <label key={item.key}>
                        {item.name}
                        <Checkbox
                          name={item.name}
                          checked={this.state.foodType.get(item.name)}
                          onChange={this.handleCheckboxChange}
                        />
                      </label>
                    ))}
                  </div>
                </div>
                <div className="field">
                  <label className="label">Cook Time(in minutes)</label>
                  <div className="control">
                    <input
                      className="input"
                      name="cookTime"
                      type="number"
                      value={this.state.value}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Prep Time(in minutes)</label>
                  <div className="control">
                    <input
                      className="input"
                      name="prepTime"
                      type="text"
                      value={this.state.value}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    {ingredientsCheckboxes.map((item) => (
                      <label key={item.key}>
                        {item.name}
                        <Checkbox
                          name={item.name}
                          checked={this.state.ingredients.get(item.name)}
                          onChange={this.handleIngredientsCheckboxChange}
                        />
                      </label>
                    ))}
                  </div>
                </div>
                <div className="field">
                  <label className="label">Serves</label>
                  <div className="control">
                    <input
                      className="input"
                      name="serves"
                      type="number"
                      value={this.state.value}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Directions</label>
                  <div className="control">
                    <textarea
                      className="input"
                      name="directions"
                      type="textarea"
                      value={this.state.value}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <input className="submit" type="submit" value="Submit" />
              </form>
            </div>
            <div className="column" />
          </div>
        </div>
      </section>
    )
  }
}

export default AddRecipe
