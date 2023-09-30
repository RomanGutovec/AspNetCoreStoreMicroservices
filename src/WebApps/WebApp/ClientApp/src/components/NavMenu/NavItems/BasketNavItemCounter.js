import React from 'react';
import BasketImage from './add-to-basket-3042.svg';
import "./BasketNavItemCounter.css";
import BasketIcon from "./BasketIcon";

const BasketNavItemCounter = ({count}) => (

    <div className="basket-container">
        {/*<img src={BasketImage} alt="Basket" />*/}
        <BasketIcon/>
        {
            count > 0 &&
            <div className="product-count">
                {count}
            </div>
        }
    </div>

    // <div className="basket-container">
    //     <img src={BasketImage} alt="Basket" />
    //     {
    //         count > 0 &&
    //         <div className="product-count">
    //             {count}
    //         </div>
    //     }
    // </div>
);

export default BasketNavItemCounter