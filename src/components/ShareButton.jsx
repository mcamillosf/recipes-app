import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ShareButton({ setLoadMessage, testid, smallRecipeCard, url }) {
  const { pathname } = useLocation();
  const { href } = window.location;
  let copyLink;

  if (pathname.includes('in-progress')) {
    const [link] = href.split('/in-progress');
    copyLink = link;
  } else if (smallRecipeCard) {
    copyLink = url;
  } else {
    copyLink = href;
  }

  const shareRecipe = () => {
    setLoadMessage(true);
    copy(copyLink);
    const TIME = 2000;
    setTimeout(() => {
      setLoadMessage(false);
    }, TIME);
  };

  return (
    <input
      type="image"
      src={ shareIcon }
      className="share-btn"
      data-testid={ testid }
      onClick={ shareRecipe }
      alt="share"
    />
  );
}

ShareButton.propTypes = {
  setLoadMessage: PropTypes.func,
}.isRequired;

export default ShareButton;
