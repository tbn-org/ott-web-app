import {get, post, patch} from "./cleeng.service.js";
export const getOffer = async (payload, sandbox) => {
  return get(sandbox, `/offers/${payload.offerId}`);
};
export const createOrder = async (payload, sandbox, jwt) => {
  return post(sandbox, "/orders", JSON.stringify(payload), jwt);
};
export const updateOrder = async ({orderId, ...payload}, sandbox, jwt) => {
  return patch(sandbox, `/orders/${orderId}`, JSON.stringify(payload), jwt);
};
export const getPaymentMethods = async (sandbox, jwt) => {
  return get(sandbox, "/payment-methods", jwt);
};
export const paymentWithoutDetails = async (payload, sandbox, jwt) => {
  return post(sandbox, "/payments", JSON.stringify(payload), jwt);
};
export const paymentWithAdyen = async (payload, sandbox, jwt) => {
  return post(sandbox, "/connectors/adyen/payments", JSON.stringify(payload), jwt);
};
export const paymentWithPayPal = async (payload, sandbox, jwt) => {
  return post(sandbox, "/connectors/paypal/v1/tokens", JSON.stringify(payload), jwt);
};
