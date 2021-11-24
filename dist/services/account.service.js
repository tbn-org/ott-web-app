import {post, put, patch, get} from "./cleeng.service.js";
export const login = async (payload, sandbox) => {
  return post(sandbox, "/auths", JSON.stringify(payload));
};
export const register = async (payload, sandbox) => {
  return post(sandbox, "/customers", JSON.stringify(payload));
};
export const getPublisherConsents = async (payload, sandbox) => {
  return get(sandbox, `/publishers/${payload.publisherId}/consents`);
};
export const getCustomerConsents = async (payload, sandbox, jwt) => {
  return get(sandbox, `/customers/${payload.customerId}/consents`, jwt);
};
export const resetPassword = async (payload, sandbox) => {
  return put(sandbox, "/customers/passwords", JSON.stringify(payload));
};
export const changePassword = async (payload, sandbox) => {
  return patch(sandbox, "/customers/passwords", JSON.stringify(payload));
};
export const updateCustomer = async (payload, sandbox, jwt) => {
  return patch(sandbox, `/customers/${payload.id}`, JSON.stringify(payload), jwt);
};
export const updateCustomerConsents = async (payload, sandbox, jwt) => {
  return put(sandbox, `/customers/${payload.id}/consents`, JSON.stringify(payload), jwt);
};
export const getCustomer = async (payload, sandbox, jwt) => {
  return get(sandbox, `/customers/${payload.customerId}`, jwt);
};
export const refreshToken = async (payload, sandbox) => {
  return post(sandbox, "/auths/refresh_token", JSON.stringify(payload));
};
export const getLocales = async (sandbox) => {
  return get(sandbox, "/locales");
};
export const getCaptureStatus = async ({customerId}, sandbox, jwt) => {
  return get(sandbox, `/customers/${customerId}/capture/status`, jwt);
};
export const updateCaptureAnswers = async ({customerId, ...payload}, sandbox, jwt) => {
  return put(sandbox, `/customers/${customerId}/capture`, JSON.stringify(payload), jwt);
};
