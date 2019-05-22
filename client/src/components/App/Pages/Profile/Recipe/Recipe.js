import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import Checkbox from '../AddRecipe/Checkbox'

class Recipe extends Component {
  state = {
    title: '',
    cookTime: 0,
    description: '',
    directions: [],
    foodType: {},
    ingredients: {},
    prepTime: 0,
    serves: 0,
    allowedFoodTypes: [],
    sweeteners: [],
    vegetables: [],
    meats: [],
    seasoning: [],
    fruits: [],
    dairy: [],
    grains: [],
    oils: [],
    redirect: false
  }

  getRecipeID() {
    const splitURL = window.location.href.split('/')
    const id = splitURL[splitURL.length - 1]

    return id
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const id = this.getRecipeID()

    try {
      const res = await axios({
        method: 'patch',
        url: `/api/recipes/${id}`,
        data: {
          title: this.state.title,
          description: this.state.description,
          foodType: this.state.foodType,
          cookTime: this.state.cookTime,
          prepTime: this.state.prepTime,
          ingredients: this.state.ingredients,
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

  handleChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({ [name]: value })
  }
  handlefoodTypeCheckboxChange = (event) => {
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

  handleIngredientsCheckboxChange = (event) => {
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

  getFormData = async () => {
    const res = await axios.get('/api/formData')

    this.setState({ allowedFoodTypes: res.data.foodTypes })
    delete res.data.foodTypes

    Object.keys(res.data).forEach((key) => {
      this.setState(() => ({ [key]: res.data[key] }))
    })
  }

  async componentDidMount() {
    const id = this.getRecipeID()
    try {
      const res = await axios.get(`/api/recipes/${id}`, {
        headers: {
          'Content-Type': 'applicatdion/json'
        }
      })

      if (res) {
        delete res.data.chef
        delete res.data.__v
        delete res.data._id
        delete res.data.createdAt
        delete res.data.rating
        delete res.data.updatedAt

        this.setState(() => res.data)
        console.log(this.state)
      }
    } catch (e) {
      console.log(e)
    }

    this.getFormData()
  }

  renderRecipe() {
    const { title, cookTime, description, directions, foodType, ingredients, prepTime, serves } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="content">
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input onChange={this.handleChange} name="title" className="input is-primary" type="text" value={title} />
            </div>
          </div>
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <input
                onChange={this.handleChange}
                name="description"
                className="input is-primary"
                type="text"
                value={description}
              />
            </div>
          </div>
          <div className="field content">
            <h4>Food Types</h4>
            <div className="control is-grouped">
              {this.state.allowedFoodTypes.map((item) => (
                <Checkbox
                  type="checkbox"
                  name={item}
                  checked={this.showFoodTypeChecked(item)}
                  onChange={this.handlefoodTypeCheckboxChange}
                />
              ))}
            </div>
          </div>
          <div className="field">
            <label className="label">Cooktime</label>
            <div className="control">
              <input
                name="cookTime"
                onChange={this.handleChange}
                className="input is-primary"
                type="number"
                value={cookTime}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Preptime</label>
            <div className="control">
              <input
                name="prepTime"
                onChange={this.handleChange}
                className="input is-primary"
                type="number"
                value={prepTime}
              />
            </div>
          </div>
          <div className="field content">
            <h4>Vegetables</h4>
            <div className="control is-grouped">
              {this.state.vegetables.map((item) => (
                <Checkbox
                  type="checkbox"
                  name={item}
                  checked={this.showIngredientChecked(item)}
                  onChange={this.handleIngredientsCheckboxChange}
                />
              ))}
            </div>
          </div>
          <div className="field content">
            <h4>Fruits</h4>
            <div className="control is-grouped">
              {this.state.fruits.map((item) => (
                <Checkbox
                  type="checkbox"
                  name={item}
                  checked={this.showIngredientChecked(item)}
                  onChange={this.handleIngredientsCheckboxChange}
                />
              ))}
            </div>
          </div>
          <div className="field content">
            <h4>Seasonings</h4>
            <div className="control is-grouped">
              {this.state.seasoning.map((item) => (
                <Checkbox
                  type="checkbox"
                  name={item}
                  checked={this.showIngredientChecked(item)}
                  onChange={this.handleIngredientsCheckboxChange}
                />
              ))}
            </div>
          </div>
          <div className="field content">
            <h4>Sweeteners</h4>
            <div className="control is-grouped">
              {this.state.sweeteners.map((item) => (
                <Checkbox
                  type="checkbox"
                  name={item}
                  checked={this.showIngredientChecked(item)}
                  onChange={this.handleIngredientsCheckboxChange}
                />
              ))}
            </div>
          </div>
          <div className="field content">
            <h4>Meats</h4>
            <div className="control is-grouped">
              {this.state.meats.map((item) => (
                <Checkbox
                  type="checkbox"
                  name={item}
                  checked={this.showIngredientChecked(item)}
                  onChange={this.handleIngredientsCheckboxChange}
                />
              ))}
            </div>
          </div>
          <div className="field content">
            <h4>Dairy</h4>
            <div className="control is-grouped">
              {this.state.dairy.map((item) => (
                <Checkbox
                  type="checkbox"
                  name={item}
                  checked={this.showIngredientChecked(item)}
                  onChange={this.handleIngredientsCheckboxChange}
                />
              ))}
            </div>
          </div>
          <div className="field content">
            <h4>Grains</h4>
            <div className="control is-grouped">
              {this.state.grains.map((item) => (
                <Checkbox
                  type="checkbox"
                  name={item}
                  checked={this.showIngredientChecked(item)}
                  onChange={this.handleIngredientsCheckboxChange}
                />
              ))}
            </div>
          </div>
          <div className="field content">
            <h4>Oils</h4>
            <div className="control is-grouped">
              {this.state.oils.map((item) => (
                <Checkbox
                  type="checkbox"
                  name={item}
                  checked={this.showIngredientChecked(item)}
                  onChange={this.handleIngredientsCheckboxChange}
                />
              ))}
            </div>
          </div>
          <div className="field">
            <label className="label">Serves</label>
            <div className="control">
              <input
                name="serves"
                onChange={this.handleChange}
                className="input is-primary"
                type="number"
                value={serves}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Directions </label>
            <div className="control">
              <input
                name="directions"
                onChange={this.handleChange}
                className="input is-primary"
                type="text"
                value={directions}
              />
            </div>
          </div>
        </div>
        <input className="submit button is-link" type="submit" value="Submit" />
      </form>
    )
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/profile" />
    }
    return (
      <Fragment>
        <div className="column">
          <div className="tile is-ancestor">
            <div className="tile is-parent is-4">
              <div className="tile is-child box">{this.renderRecipe()}</div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Recipe
