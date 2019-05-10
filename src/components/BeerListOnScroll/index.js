import React from "react";
import { compose } from "recompose";
import { bool, func } from "prop-types";

import MainPage from "../MainPage";

const withLoading = Component => ({ ...props, isLoading }) => (
  <div>
    <Component {...props} />

    <div className="interactions">
      {isLoading && <span>Loading...</span>}
    </div>
  </div>
);

withLoading.propTypes = {
  isLoading: bool.isRequired
};

const withInfiniteScroll = Component =>
  class WithInfiniteScroll extends React.Component {
    static propTypes = {
      isLoading: bool.isRequired,
      isThereMoreBeers: bool.isRequired,
      onPaginatedSearch: func.isRequired
    };

    componentDidMount() {
      window.addEventListener("scroll", this.onScroll, false);
    }

    componentWillUnmount() {
      window.removeEventListener("scroll", this.onScroll, false);
    }

    onScroll = () => {
      const { isThereMoreBeers, isLoading, onPaginatedSearch } = this.props;
      let scrollTop =
        (document.documentElement && document.documentElement.scrollTop) ||
        document.body.scrollTop;
      let scrollHeight =
        (document.documentElement && document.documentElement.scrollHeight) ||
        document.body.scrollHeight;
      let clientHeight =
        document.documentElement.clientHeight || window.innerHeight;
      let scrolledToBottom =
        Math.ceil(scrollTop + clientHeight) >= scrollHeight - 10;

      if (scrolledToBottom && isThereMoreBeers && !isLoading) {
        onPaginatedSearch();
      }
    };
    render() {
      return <Component {...this.props} />;
    }
  };

const BeerList = compose(
  withInfiniteScroll,
  withLoading
)(MainPage);

export default BeerList;
