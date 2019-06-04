import React, { Component } from 'react'
import styles from './styles.module.css'

class RecipeCard extends Component {
  render() {
    const { _id, title, description, serves, prepTime, cookTime } = this.props.recipe
    return (
      <div key={_id} className={styles.cardStyle + ` card`}>
        <header className="card-header">
          <p className={styles['title-style'] + ` card-header-title`}>{title}</p>
        </header>
        <div className="card-content">
          <p className={styles.paragraphs}>{description}</p>
        </div>
        <footer className="card-footer">
          <div className="card-footer-item">serves: {serves}</div>
          <div className="card-footer-item">preptime: {prepTime}</div>
          <div className="card-footer-item">cooktime: {cookTime}</div>
        </footer>
      </div>
    )
  }
}

export default RecipeCard
