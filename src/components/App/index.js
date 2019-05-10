import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { bool, func, arrayOf, shape } from "prop-types";

import BeerList from "../BeerListOnScroll";
import BeerDetails from "../BeerDetails";
import Inputs from "../Inputs/Inputs";
import SquareLoader from "../Loaders/SquareLoader";
import {
  fetchBeersAndPaginate,
  getBeers,
  checkIfMoreBeers,
  hasBeersFetchFailed,
  areBeersLoading
} from "../../modules";

import "../../style/App.scss";

class BeerApp extends React.Component {
  componentDidMount() {
    this.props.fetchBeersAndPaginate();
  }

  render() {
    const {
      isLoading,
      beers,
      error,
      isThereMoreBeers,
      fetchBeersAndPaginate
    } = this.props;

    const beersRoutes = beers.map((beer, index) => {
      return (
        <Route
          key={index}
          path={`/details/${beer.id}`}
          render={props => <BeerDetails beers={beers} beer={beer} {...props} />}
        />
      );
    });

    if (isLoading && !beers.length) {
      return (
        <div className="square_container">
          <SquareLoader />
        </div>
      );
    }

    if (error) {
      return (
        <div className="square_container" style={{ color: "red" }}>
          Opps! Something went horribly wrong!
        </div>
      );
    }

    return (
      <div className="App">
        <Route
          exact
          path="/"
          render={props => (
            <BeerList
              beers={beers}
              onPaginatedSearch={fetchBeersAndPaginate}
              isLoading={isLoading}
              isThereMoreBeers={isThereMoreBeers}
              {...props}
            />
          )}
        />
        {beersRoutes}
        <Route exact path="/inputs" component={Inputs} />
      </div>
    );
  }
}

BeerApp.propTypes = {
  beers: arrayOf(shape({})),
  error: bool.isRequired,
  fetchBeersAndPaginate: func.isRequired,
  isLoading: bool.isRequired,
  isThereMoreBeers: bool.isRequired,
};

const mapStateToProps = state => {
  const beers = getBeers(state);
  const isThereMoreBeers = checkIfMoreBeers(state);
  const error = hasBeersFetchFailed(state);
  const isLoading = areBeersLoading(state);
  return { beers, isThereMoreBeers, error, isLoading };
};

const mapDispatchToProps = {
  fetchBeersAndPaginate
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(BeerApp);
