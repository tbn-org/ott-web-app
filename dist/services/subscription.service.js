import {addQueryParams} from "../utils/formatting.js";
import {patch, get} from "./cleeng.service.js";
export const getSubscriptions = async (payload, sandbox, jwt) => {
  return get(sandbox, `/customers/${payload.customerId}/subscriptions`, jwt);
};
export const updateSubscription = async (payload, sandbox, jwt) => {
  return patch(sandbox, `/customers/${payload.customerId}/subscriptions`, JSON.stringify(payload), jwt);
};
export const getPaymentDetails = async (payload, sandbox, jwt) => {
  return get(sandbox, `/customers/${payload.customerId}/payment_details`, jwt);
};
export const getTransactions = async ({customerId, limit, offset}, sandbox, jwt) => {
  return get(sandbox, addQueryParams(`/customers/${customerId}/transactions`, {limit, offset}), jwt);
};
