import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function DoneCards({ doneRecipes }) {
  const [message, setMessage] = useState(false);
  const history = useHistory();
  const [messageIndex, setMessageIndex] = useState();

  const changeMessage = (index) => {
    setMessageIndex(index);
    const time = 2000;
    setMessage(true);
    setTimeout(() => {
      setMessage(false);
    }, time);
  };

  const changeRoute = (type, id) => {
    history.push(`/${type}s/${id}`);
  };

  const orig = window.location.origin;
  return (
    <div>
      {doneRecipes ? doneRecipes
        .map(({
          id, area, type, category, doneDate, image, name, tags, alcoholicOrNot,
        }, index) => (
          <div key={ index } className="doneRecipe">
            <div>
              <Link to={ `/${type}s/${id}` }>
                <img
                  src={ image }
                  alt={ name }
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
                  {type === 'comida'
                    ? <p>{`${area} - ${category}`}</p> : <p>{alcoholicOrNot}</p>}
                </div>
                <input
                  type="image"
                  className="share-btn"
                  data-testid={ `${index}-horizontal-share-btn` }
                  onClick={ () => {
                    (copy(`${orig}/${type}s/${id}`));
                    changeMessage(index);
                  } }
                  src={ shareIcon }
                  alt="share"
                />
              </div>
              <button
                onClick={ () => changeRoute(type, id) }
                type="button"
                className="title-btn"
              >
                <p
                  className="title"
                  data-testid={ `${index}-horizontal-name` }
                >
                  {name}

                </p>
              </button>
              {/* Matheus Duarte me ajudou a pensar nisso */}
              {index === messageIndex
                ? <span hidden={ !message }> Link copiado! </span> : ''}
              <p data-testid={ `${index}-horizontal-done-date` }>
                {`Feito em: ${doneDate}`}
              </p>
              <div className="tags">
                {tags ? tags.slice(0, 2).map((item, i) => (
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

DoneCards.propTypes = {
  doneRecipes: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};

export default DoneCards;
