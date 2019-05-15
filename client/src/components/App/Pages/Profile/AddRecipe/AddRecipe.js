import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import Checkbox from '../AddRecipe/Checkbox'
import InputField from '../InputField'
import axios from 'axios'

class AddRecipe extends Component {
  state = {
    recipeTitle: '',
    description: '',
    foodType: [],
    cookTime: 0,
    prepTime: 0,
    ingredients: [],
    serves: 0,
    directions: '',
    redirect: false,
    allowedFoodTypes: [],
    sweeteners: [],
    vegetables: [],
    meats: [],
    seasoning: [],
    fruits: [],
    dairy: [],
    grains: [],
    oils: []
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
    console.log(this.props)
    if (this.state.redirect) {
      return <Redirect to="/profile" />
    }
    // console.log(this.state)
    return (
      <Fragment>
        <div className="column">
          <h2>Add a new recipe</h2>
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
            <div className="field">
              <label className="label">Food Type</label>
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
            <div className="field">
              <label className="label">Ingredients</label>
              <div className="control">
                <label className="label">Vegetables</label>
                {this.state.vegetables.map((item) => (
                  <label className="checkbox" key={item}>
                    {item}
                    <Checkbox
                      name={item}
                      checked={this.showIngredientChecked(item)}
                      onChange={this.handleIngredientsCheckboxChange}
                    />
                  </label>
                ))}
              </div>
              <div className="control">
                <label className="label">Fruit</label>
                {this.state.fruits.map((item) => (
                  <label className="checkbox" key={item}>
                    {item}
                    <Checkbox
                      name={item}
                      checked={this.showIngredientChecked(item)}
                      onChange={this.handleIngredientsCheckboxChange}
                    />
                  </label>
                ))}
              </div>
              <div className="control">
                <label className="label">Seasoning</label>
                {this.state.seasoning.map((item) => (
                  <label className="checkbox" key={item}>
                    {item}
                    <Checkbox
                      name={item}
                      checked={this.showIngredientChecked(item)}
                      onChange={this.handleIngredientsCheckboxChange}
                    />
                  </label>
                ))}
              </div>
              <div className="control">
                <label className="label">Sweeteners</label>
                {this.state.sweeteners.map((item) => (
                  <label className="checkbox" key={item}>
                    {item}
                    <Checkbox
                      name={item}
                      checked={this.showIngredientChecked(item)}
                      onChange={this.handleIngredientsCheckboxChange}
                    />
                  </label>
                ))}
              </div>
              <div className="control">
                <label className="label">Meats</label>
                {this.state.meats.map((item) => (
                  <label className="checkbox" key={item}>
                    {item}
                    <Checkbox
                      name={item}
                      checked={this.showIngredientChecked(item)}
                      onChange={this.handleIngredientsCheckboxChange}
                    />
                  </label>
                ))}
              </div>
              <div className="control">
                <label className="label">Dairy</label>
                {this.state.dairy.map((item) => (
                  <label className="checkbox" key={item}>
                    {item}
                    <Checkbox
                      name={item}
                      checked={this.showIngredientChecked(item)}
                      onChange={this.handleIngredientsCheckboxChange}
                    />
                  </label>
                ))}
              </div>
              <div className="control">
                <label className="label">Grains</label>
                {this.state.grains.map((item) => (
                  <label className="checkbox" key={item}>
                    {item}
                    <Checkbox
                      name={item}
                      checked={this.showIngredientChecked(item)}
                      onChange={this.handleIngredientsCheckboxChange}
                    />
                  </label>
                ))}
              </div>
              <div className="control">
                <label className="label">Oils</label>
                {this.state.oils.map((item) => (
                  <label className="checkbox" key={item}>
                    {item}
                    <Checkbox
                      name={item}
                      checked={this.showIngredientChecked(item)}
                      onChange={this.handleIngredientsCheckboxChange}
                    />
                  </label>
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
        </div>
        <div className="column" />
      </Fragment>
    )
  }
}

export default AddRecipe
