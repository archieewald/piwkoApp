import React from "react";
import { Link } from "react-router-dom";
import { string, arrayOf, shape, number } from "prop-types";

import CircleLoader from "../Loaders/CircleLoader";

class BeerDetails extends React.Component {
  state = {
    recomendedBeers: [],
    imageStatus: false
  };

  componentDidMount() {
    this.findRecomendedBeers();
  }

  findRecomendedBeers = () => {
    const {
      beers,
      beer: { abv, ibu, ebc, id }
    } = this.props;

    const recomendedBeers = (property, propertyKey, marginValue) => {
      const sorting = beers.filter(beer => {
        if (
          Math.abs(property - beer[propertyKey]) < Number(marginValue) &&
          beer.id !== id
        ) {
          return beer;
        }
        return null;
      });
      return sorting;
    };

    const recomendedByABV = recomendedBeers(abv, "abv", 1);
    const recomendedByIBU = recomendedBeers(ibu, "ibu", 20);
    const recomendedByEBC = recomendedBeers(ebc, "ebc", 25);

    const recomendedListToSort = [
      ...recomendedByIBU,
      ...recomendedByABV,
      ...recomendedByEBC
    ];
    const recomendedList = [...new Set(recomendedListToSort)];

    this.setState({
      recomendedBeers: this.getRandomBeers(recomendedList, 3)
    });
  };

  getRandomBeers = (arr, count) => {
    let shuffled = arr.slice(0),
      i = arr.length,
      min = i - count,
      temp,
      index;
    while (i-- > min) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    return shuffled.slice(min);
  };

  imageHandler = () => {
    this.setState({
      imageStatus: true
    });
  };

  render() {
    const {
      beer: {
        abv,
        ibu,
        ebc,
        food_pairing,
        name,
        image_url,
        tagline,
        description
      }
    } = this.props;
    const { recomendedBeers, imageStatus } = this.state;

    const pairedFoodList = food_pairing.map(dish => {
      return <li key={dish}> {dish}</li>;
    });

    const recommendedBeersList = recomendedBeers.map(
      ({ name, id, image_url }) => {
        return (
          <Link key={id} to={`/details/${id}`}>
            <div className="recommended">
              <div className="image">
                <div
                  className="img-loading"
                  style={{ display: imageStatus ? "none" : "block" }}
                >
                  <CircleLoader />
                </div>
                <img
                  style={{ display: imageStatus ? "block" : "none" }}
                  onLoad={this.imageHandler}
                  alt={name}
                  className="detail_beer_img"
                  src={image_url}
                />
              </div>
              <p>{name}</p>
            </div>
          </Link>
        );
      }
    );

    return (
      <div className="highlight_frame">
        <div className="highlight_container">
          <div className="highlight_info">
            <div className="image">
              <div
                className="img-loading"
                style={{ display: imageStatus ? "none" : "block" }}
              >
                <CircleLoader />
              </div>
              <img
                style={{ display: imageStatus ? "block" : "none" }}
                onLoad={this.imageHandler}
                alt={name}
                className="highlight_beer_img"
                src={image_url}
              />
            </div>
            <div className="highlight_details">
              <div className="highlight_header">
                <h3>{name}</h3>
                <h4>{tagline}</h4>
              </div>
              <div className="highlight_short">
                <ul className="ABVS_list">
                  <li>
                    <span>ibu: </span>
                    {ibu}
                  </li>
                  <li>
                    <span>abv: </span>
                    {abv}
                  </li>
                  <li>
                    <span>ebc: </span>
                    {ebc}
                  </li>
                </ul>
              </div>
              <div className="highlight_descr">
                <p>{description}</p>
              </div>
              <div className="highlight_pair">
                <h4>best served with:</h4>
                <ul className="pairing_list">{pairedFoodList}</ul>
              </div>
            </div>
          </div>
          <div className="similar_beers_container">
            <h4>You might also like:</h4>
            <div className="similar_beers">{recommendedBeersList}</div>
          </div>
          <div className="button_container">
            <div className="close">
              <Link to="/">
                <span className="arrow" />
                <div className="button">
                  <span>Go back to beer selection</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BeerDetails.propTypes = {
  beer: shape({
    abv: number.isRequired,
    description: string.isRequired,
    ebc: number.isRequired,
    food_pairing: arrayOf(string).isRequired,
    ibu: number.isRequired,
    image_url: string.isRequired,
    name: string.isRequired,
    tagline: string.isRequired
  }),
  beers: arrayOf(shape({})).isRequired
};

export default BeerDetails;
