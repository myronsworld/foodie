import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import Checkbox from '../AddRecipe/Checkbox'
import ingredientsCheckboxes from '../AddRecipe/ingredientsCheckboxes'
import axios from 'axios'

class AddRecipe extends Component {
  constructor(props) {
    super(props)

    this.state = {
      recipeTitle: '',
      description: '',
      foodType: [],
      cookTime: null,
      prepTime: null,
      ingredients: [],
      serves: null,
      directions: '',
      redirect: false,
      allowedFoodTypes: []
    }

    this.handlefoodTypeCheckboxChange = this.handlefoodTypeCheckboxChange.bind(this)
    this.handleIngredientsCheckboxChange = this.handleIngredientsCheckboxChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    const res = await axios.get('/api/formData/foodtypes')
    this.setState({ allowedFoodTypes: res.data })
  }

  handleChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({ [name]: value })
  }

  handlefoodTypeCheckboxChange(event) {
    const target = event.target.name

    if (!this.state.foodType.includes(target)) {
      this.setState((prevState) => ({
        foodType: [...prevState.foodType, target]
      }))
    } else {
      this.setState((prevState) => ({
        foodType: [...prevState.foodType.filter((current) => current !== target)]
      }))
    }
  }

  handleIngredientsCheckboxChange(event) {
    const target = event.target.name

    if (!this.state.ingredients.includes(target)) {
      this.setState((prevState) => ({
        ingredients: [...prevState.ingredients, target]
      }))
    } else {
      this.setState((prevState) => ({
        ingredients: [...prevState.ingredients.filter((current) => current !== target)]
      }))
    }
  }

  showFoodTypeChecked(searchFoodType) {
    if (this.state.foodType.includes(searchFoodType)) {
      return true
    }
  }

  showIngredientChecked(searchIngredient) {
    if (this.state.ingredients.includes(searchIngredient)) {
      return true
    }
  }

  async handleSubmit(event) {
    event.preventDefault()
    try {
      const res = await axios({
        method: 'post',
        url: '/api/recipe',
        data: {
          title: this.state.recipeTitle,
          description: this.state.description,
          foodType: this.state.foodType,
          cookTime: this.state.cookTime,
          prepTime: this.state.prepTime,
          ingredients: this.state.ingredients,
          rating: 2,
          serves: this.state.serves,
          directions: this.state.directions
        }
      })
      if (res) {
        this.setState(() => ({ redirect: true }))
      }
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/profile" />
    }
    return (
      <Fragment>
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
                {this.state.allowedFoodTypes.map((item) => (
                  <label className="checkbox" key={item}>
                    {item}
                    <Checkbox
                      name={item}
                      checked={this.showFoodTypeChecked(item)}
                      onChange={this.handlefoodTypeCheckboxChange}
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
                  type="number"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                {ingredientsCheckboxes.map((item) => (
                  <label className="checkbox" key={item.key}>
                    {item.name}
                    <Checkbox
                      name={item.name}
                      checked={this.showIngredientChecked(item.name)}
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
            <input className="submit button" type="submit" value="Submit" />
          </form>
        </div>
        <div className="column" />
      </Fragment>
    )
  }
}

export default AddRecipe
