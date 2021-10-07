import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FavoriteButton from './FavoriteButton';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function SmallRecipeCard({ recipes, isFavoritePage, handleReload }) {
  const [message, setMessage] = useState(false);
  const [messageIndex, setMessageIndex] = useState();

  const changeMessage = (index) => {
    setMessageIndex(index);
    const time = 2000;
    setMessage(true);
    setTimeout(() => {
      setMessage(false);
    }, time);
  };

  const orig = window.location.origin;
  return (
    <div>
      {recipes ? recipes
        .map((recipe, index) => (
          <div key={ index } className="doneRecipe">
            <div>
              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <img
                  src={ recipe.image }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
            </div>
            <div className="items-list">
              <div className="head-done">
                <div
                  data-testid={ `${index}-horizontal-top-text` }
                  className="top-text"
                >
                  {recipe.type === 'comida'
                    ? <p>{`${recipe.area} - ${recipe.category}`}</p>
                    : <p>{recipe.alcoholicOrNot}</p>}
                </div>
                <input
                  type="image"
                  className="share-btn"
                  data-testid={ `${index}-horizontal-share-btn` }
                  onClick={ () => {
                    (copy(`${orig}/${recipe.type}s/${recipe.id}`));
                    changeMessage(index);
                  } }
                  src={ shareIcon }
                  alt="share"
                />
                {isFavoritePage && (<FavoriteButton
                  handleReload={ handleReload }
                  testid={ `${index}-horizontal-favorite-btn` }
                  isFavoritePage
                  details={ recipe }
                />)}
              </div>
              {/* Matheus Duarte me ajudou a pensar nisso */}
              {index === messageIndex
                ? <p hidden={ !message }> Link copiado! </p> : ''}
              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <p className="title" data-testid={ `${index}-horizontal-name` }>
                  {recipe.name}
                </p>
              </Link>
              {!isFavoritePage && (
                <p data-testid={ `${index}-horizontal-done-date` }>
                  {`Feito em: ${recipe.doneDate}`}
                </p>)}
              <div className="tags">
                {recipe.tags ? recipe.tags.splice(0, 2).map((item, i) => (
                  <p key={ i } data-testid={ `${index}-${item}-horizontal-tag` }>
                    {item}
                  </p>
                )) : ''}
              </div>
            </div>
          </div>
        )) : 'loading'}
    </div>
  );
}

SmallRecipeCard.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  isFavoritePage: PropTypes.bool.isRequired,
  handleReload: PropTypes.func,
};

SmallRecipeCard.defaultProps = {
  handleReload: () => console.log('oi'),
};

export default SmallRecipeCard;
