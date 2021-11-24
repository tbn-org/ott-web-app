import {formatPrice} from "./formatting.js";
export const getOfferPrice = (offer) => formatPrice(offer.customerPriceInclTax, offer.customerCurrency, offer.customerCountry);
