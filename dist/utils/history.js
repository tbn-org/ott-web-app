export function addQueryParam(history, key, value) {
  const urlSearchParams = new URLSearchParams(history.location.search);
  urlSearchParams.set(key, value);
  const searchParams = urlSearchParams.toString();
  return `${history.location.pathname}${searchParams ? `?${searchParams}` : ""}`;
}
export function removeQueryParam(history, key) {
  const urlSearchParams = new URLSearchParams(history.location.search);
  urlSearchParams.delete(key);
  const searchParams = urlSearchParams.toString();
  return `${history.location.pathname}${searchParams ? `?${searchParams}` : ""}`;
}
