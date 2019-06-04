import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'

class RecipeCard extends Component {
  render() {
    const { _id, title, description, serves, prepTime, cookTime } = this.props.recipe
    return (
      <div className={styles.cardStyle}>
        <header className="card-header">
          <p className={styles['title-style'] + ` card-header-title`}>
            <Link to={`recipes/` + _id}>{title}</Link>
          </p>
        </header>
        <div className="card-content">
          <p className={styles.paragraphs}>{description}</p>
        </div>
        <footer className="card-footer">
          <div className={styles['card-footer-item-style'] + ` card-footer-item`}>serves: {serves}</div>
          <div className={styles['card-footer-item-style'] + ` card-footer-item`}>preptime: {prepTime}</div>
          <div className={styles['card-footer-item-style'] + ` card-footer-item`}>cooktime: {cookTime}</div>
        </footer>
      </div>
    )
  }
}

export default RecipeCard
