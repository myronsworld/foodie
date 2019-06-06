import React, { Component } from 'react'
import Checkbox from '../AddRecipe/Checkbox'
import { Redirect } from 'react-router-dom'
import InputField from '../InputField'
import axios from 'axios'

class RecipeForm extends Component {
  state = {
    recipeTitle: '',
    description: '',
    foodType: [],
    cookTime: 0,
    prepTime: 0,
    ingredients: [],
    serves: 0,
    directions: '',
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
  async componentDidMount() {
    const res = await axios.get('/api/formData')

    this.setState({ allowedFoodTypes: res.data.foodTypes })
    delete res.data.foodTypes

    Object.keys(res.data).forEach((key) => {
      this.setState(() => ({ [key]: res.data[key] }))
    })
  }

  handleSubmit = async (event) => {
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
  render() {
    if (this.state.redirect) {
      return <Redirect to="/profile" />
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <InputField
          name={Object.getOwnPropertyNames(this.state)[0]}
          value={this.state.recipeTitle}
          onChange={this.handleChange}
        />
        <InputField
          name={Object.getOwnPropertyNames(this.state)[1]}
          value={this.state.description}
          onChange={this.handleChange}
        />
        <div className="field content">
          <h4>Food Types</h4>
          <div className="control is-grouped">
            {this.state.allowedFoodTypes.map((item) => (
              <Checkbox
                key={item}
                type="checkbox"
                name={item}
                checked={this.showFoodTypeChecked(item)}
                onChange={this.handlefoodTypeCheckboxChange}
              />
            ))}
          </div>
        </div>
        <InputField
          name={Object.getOwnPropertyNames(this.state)[3]}
          value={this.state.cookTime}
          onChange={this.handleChange}
        />
        <InputField
          name={Object.getOwnPropertyNames(this.state)[4]}
          value={this.state.prepTime}
          onChange={this.handleChange}
        />
        <div className="field content">
          <h4>Vegetables</h4>
          <div className="control is-grouped">
            {this.state.vegetables.map((item) => (
              <Checkbox
                key={item}
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
                key={item}
                type="checkbox"
                name={item}
                checked={this.showIngredientChecked(item)}
                onChange={this.handleIngredientsCheckboxChange}
              />
            ))}
          </div>
        </div>
        <div className="field content">
          <h4>Seasoning</h4>
          <div className="control is-grouped">
            {this.state.seasoning.map((item) => (
              <Checkbox
                key={item}
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
                key={item}
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
                key={item}
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
                key={item}
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
                key={item}
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
                key={item}
                type="checkbox"
                name={item}
                checked={this.showIngredientChecked(item)}
                onChange={this.handleIngredientsCheckboxChange}
              />
            ))}
          </div>
        </div>
        <InputField
          name={Object.getOwnPropertyNames(this.state)[6]}
          value={this.state.serves}
          onChange={this.handleChange}
        />
        <InputField
          name={Object.getOwnPropertyNames(this.state)[7]}
          value={this.state.directions}
          onChange={this.handleChange}
        />
        <input className="submit button is-link" type="submit" value="Submit" />
      </form>
    )
  }
}

export default RecipeForm
