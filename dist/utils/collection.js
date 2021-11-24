const getFiltersFromConfig = (config, playlistId) => {
  const menuItem = config.menu.find((item) => item.playlistId === playlistId);
  const filters = menuItem?.filterTags?.split(",");
  return filters || [];
};
const filterPlaylist = (playlist, filter) => {
  if (!filter)
    return playlist;
  return playlist.filter(({tags}) => tags ? tags.split(",").includes(filter) : false);
};
const getFiltersFromSeries = (series) => series.reduce((filters, item) => item.seasonNumber && filters.includes(item.seasonNumber) ? filters : filters.concat(item.seasonNumber || ""), []);
const filterSeries = (playlist, filter) => {
  if (!filter)
    return playlist;
  return playlist.filter(({seasonNumber}) => seasonNumber === filter);
};
const chunk = (input, size) => {
  return input?.reduce((arr, item, idx) => {
    return idx % size === 0 ? [...arr, [item]] : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]];
  }, []);
};
const findPlaylistImageForWidth = (playlistItem, width) => playlistItem.images.find((img) => img.width === width)?.src || playlistItem.image;
const generatePlaylistPlaceholder = (playlistLength = 15) => ({
  title: "",
  playlist: new Array(playlistLength).fill({}).map((_value, index) => ({
    description: "",
    duration: 0,
    feedid: "",
    image: "",
    images: [],
    link: "",
    genre: "",
    mediaid: `placeholder_${index}`,
    pubdate: 0,
    rating: "",
    sources: [],
    tags: "",
    title: "",
    tracks: []
  }))
});
const formatConsentValues = (publisherConsents, customerConsents) => {
  if (!publisherConsents || !customerConsents) {
    return {};
  }
  const values = {};
  publisherConsents?.forEach((publisherConsent) => {
    if (customerConsents?.find((customerConsent) => customerConsent.name === publisherConsent.name && customerConsent.state === "accepted")) {
      values[publisherConsent.name] = true;
    }
  });
  return values;
};
const extractConsentValues = (consents) => {
  const values = {};
  if (!consents) {
    return values;
  }
  consents?.forEach((consent) => {
    values[consent.name] = consent.enabledByDefault;
  });
  return values;
};
const formatConsentsFromValues = (publisherConsents, values) => {
  const consents = [];
  if (!publisherConsents || !values)
    return consents;
  publisherConsents.forEach((consent) => {
    consents.push({
      name: consent.name,
      version: consent.version,
      state: values.consents[consent.name] ? "accepted" : "declined"
    });
  });
  return consents;
};
const checkConsentsFromValues = (publisherConsents, consents) => {
  const customerConsents = [];
  const consentsErrors = [];
  if (!publisherConsents || !consents)
    return {customerConsents, consentsErrors};
  publisherConsents.forEach((consent) => {
    if (consent.required && !consents[consent.name]) {
      consentsErrors.push(consent.name);
    }
    customerConsents.push({
      name: consent.name,
      version: consent.version,
      state: consents[consent.name] ? "accepted" : "declined"
    });
  });
  return {customerConsents, consentsErrors};
};
const deepCopy = (obj) => {
  if (Array.isArray(obj) || typeof obj === "object" && obj !== null) {
    return JSON.parse(JSON.stringify(obj));
  }
  return obj;
};
export {
  getFiltersFromConfig,
  getFiltersFromSeries,
  filterPlaylist,
  filterSeries,
  chunk,
  findPlaylistImageForWidth,
  generatePlaylistPlaceholder,
  formatConsentValues,
  formatConsentsFromValues,
  extractConsentValues,
  checkConsentsFromValues,
  deepCopy
};
