import React from "react";
import { shape, bool, arrayOf } from "prop-types";

import BeerBox from "../BeerBox";
import CircleLoader from "../Loaders/CircleLoader";

const MainPage = ({ beers, isLoading, isThereMoreBeers }) => {
  const beerList = beers.map(element => {
    return (
      <li key={element.id}>
        <BeerBox key={element.id} beer={element} beers={beers} />
      </li>
    );
  });
  return (
    <div className="container">
      <div className="main_header">
        <div className="logo">
          beer<span>guru</span>
        </div>
      </div>
      <div className="beers_overview">
        <ul>{beerList}</ul>
      </div>
      {isLoading && (
        <div className="data-loading">
          <CircleLoader />
        </div>
      )}
      {!isThereMoreBeers && (
        <div className="end">
          <h1>That's all Folks!</h1>
        </div>
      )}
    </div>
  );
};

MainPage.propTypes = {
  beers: arrayOf(shape({})).isRequired,
  isLoading: bool.isRequired,
  isThereMoreBeers: bool.isRequired
};

export default MainPage;
