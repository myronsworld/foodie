import React, { Component, Fragment } from 'react'
import axios from 'axios'

class Recipe extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      cookTime: 0,
      description: '',
      directions: [],
      foodType: {},
      ingredients: {},
      prepTime: 0,
      serves: 0
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({ [name]: value })
  }

  async componentDidMount() {
    const splitURL = window.location.href.split('/')
    const id = splitURL[splitURL.length - 1]

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
  }

  /// need to add handle this these and setstate for each piece of state

  renderInputs(arr) {
    // arr.map((item) => {
    //   return (
    //     <div className="control">
    //       <input name="cookTime" onChange={this.handleChange} className="input is-primary" type="number" value={item} />
    //     </div>
    //   )
    // })

    return <div>df</div>
  }

  renderRecipe() {
    const { title, cookTime, description, directions, foodType, ingredients, prepTime, serves } = this.state
    return (
      <form>
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
          {/* <div className="field">
            <label className="label">FoodType</label>
            {this.renderInputs()}
          </div> */}
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
          {/* <div className="field">
            <label className="label">Ingredients</label>
            {this.renderInputs(ingredients)}
          </div> */}
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
