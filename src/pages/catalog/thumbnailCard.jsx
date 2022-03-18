import React from "react";

import "./thumbnailCard.scss";

const currencyFormater = require("currency-formatter");

const ThumbnailCard = (props) => {
  const idrFormat = (value) => {
    return currencyFormater.format(value, { code: "IDR" });
  };

  const firstLetterUpperCase = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  return (
    <>
      <a href={`/product/${props.category}-${props.productId}-${props.name}`} className="thumbnail-card">
        <div className="card-image">
          <img src={props.imageUrl} alt="product" />
        </div>

        <div className="card-body">
          <h1>{props.name}</h1>

          <div>
            <p>Category: {firstLetterUpperCase(props.category)}</p>
            <p>Price: {idrFormat(props.price)}</p>
          </div>
        </div>
      </a>
    </>
  );
};

export default ThumbnailCard;
