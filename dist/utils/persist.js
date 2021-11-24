const LOCAL_STORAGE_PREFIX = `jwshowcase.`;
const setItem = (key, value) => {
  const storageKey = `${LOCAL_STORAGE_PREFIX}${key}`;
  const storageValue = JSON.stringify(value);
  try {
    window.localStorage.setItem(storageKey, storageValue);
  } catch (error) {
    console.error(error);
  }
};
const getItem = (key) => {
  const storageKey = `${LOCAL_STORAGE_PREFIX}${key}`;
  try {
    return parseJSON(window.localStorage.getItem(storageKey));
  } catch (error) {
    console.error(error);
  }
};
const removeItem = (key) => {
  const storageKey = `${LOCAL_STORAGE_PREFIX}${key}`;
  try {
    window.localStorage.removeItem(storageKey);
  } catch (error) {
    console.error(error);
  }
};
const parseJSON = (value) => {
  if (!value)
    return;
  try {
    return JSON.parse(value);
  } catch (error) {
    return;
  }
};
export {setItem, getItem, removeItem};
