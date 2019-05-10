import React, { Component } from "react";
import { Link } from "react-router-dom";
import { string, number, shape } from "prop-types";

import CircleLoader from "../Loaders/CircleLoader";

class BeerBox extends Component {
  state = {
    imageStatus: false
  };

  imageHandler = () => {
    this.setState({
      imageStatus: true
    });
  };

  render() {
    const {
      beer: { name, id, image_url, tagline }
    } = this.props;

    const { imageStatus } = this.state;

    return (
      <Link to={`/details/${id}`}>
        <div className="beer">
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
              src={image_url}
            />
          </div>
          <div className="beer_descr">
            <h3>{name}</h3>
            <h4>{tagline}</h4>
          </div>
        </div>
      </Link>
    );
  }
}

BeerBox.propTypes = {
  beer: shape({
    name: string,
    id: number,
    tagline: string,
    image_url: string
  }).isRequired
};

export default BeerBox;
