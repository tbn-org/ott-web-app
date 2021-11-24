export const addMediaQueryListChangeListener = (mediaQuery, callback) => {
  if (typeof mediaQuery.addEventListener === "undefined") {
    mediaQuery.addListener(callback);
  } else {
    mediaQuery.addEventListener("change", callback);
  }
};
export const removeMediaQueryListChangeListener = (mediaQuery, callback) => {
  if (typeof mediaQuery.removeEventListener === "undefined") {
    mediaQuery.removeListener(callback);
  } else {
    mediaQuery.removeEventListener("change", callback);
  }
};
