import {getSeriesId, getSeriesIdFromEpisode, isEpisode, isSeriesPlaceholder} from "./media.js";
export const formatDurationTag = (seconds) => {
  if (!seconds || typeof seconds !== "number")
    return null;
  const minutes = Math.ceil(seconds / 60);
  return `${minutes} min`;
};
export const formatDuration = (duration) => {
  if (!duration || typeof duration !== "number")
    return null;
  const hours = Math.floor(duration / 3600);
  const minutes = Math.round((duration - hours * 3600) / 60);
  const hoursString = hours ? `${hours}h ` : "";
  const minutesString = minutes ? `${minutes}m ` : "";
  return `${hoursString}${minutesString}`;
};
export const addQueryParams = (url, queryParams) => {
  const queryStringIndex = url.indexOf("?");
  const urlWithoutSearch = queryStringIndex > -1 ? url.slice(0, queryStringIndex) : url;
  const urlSearchParams = new URLSearchParams(queryStringIndex > -1 ? url.slice(queryStringIndex) : void 0);
  Object.keys(queryParams).forEach((key) => {
    const value = queryParams[key];
    if (typeof value !== "string")
      return;
    urlSearchParams.set(key, value);
  });
  const queryString = urlSearchParams.toString();
  return `${urlWithoutSearch}${queryString ? `?${queryString}` : ""}`;
};
export const slugify = (text, whitespaceChar = "-") => text.toString().toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "").replace(/-/g, whitespaceChar);
export const movieURL = (item, playlistId, play = false) => addQueryParams(`/m/${item.mediaid}/${slugify(item.title)}`, {r: playlistId, play: play ? "1" : null});
export const seriesURL = (item, playlistId, play = false) => {
  const seriesId = getSeriesId(item);
  return addQueryParams(`/s/${seriesId}/${slugify(item.title)}`, {r: playlistId, play: play ? "1" : null});
};
export const episodeURL = (seriesPlaylist, episodeId, play = false, playlistId) => addQueryParams(`/s/${seriesPlaylist.feedid}/${slugify(seriesPlaylist.title)}`, {
  e: episodeId,
  r: playlistId,
  play: play ? "1" : null
});
export const episodeURLFromEpisode = (item, seriesId, playlistId, play = false) => {
  return addQueryParams(`/s/${seriesId}/${slugify(item.title)}`, {
    e: item.mediaid,
    r: playlistId,
    play: play ? "1" : null
  });
};
export const cardUrl = (item, playlistId, play = false) => {
  if (isEpisode(item)) {
    const seriesId = getSeriesIdFromEpisode(item);
    return seriesId ? episodeURLFromEpisode(item, seriesId, playlistId, play) : movieURL(item);
  }
  return isSeriesPlaceholder(item) ? seriesURL(item, playlistId, play) : movieURL(item, playlistId, play);
};
export const videoUrl = (item, playlistId, play = false) => addQueryParams(item.seriesId ? seriesURL(item, playlistId) : movieURL(item, playlistId), {
  play: play ? "1" : null
});
export const formatDate = (dateString) => {
  if (!dateString)
    return "";
  return new Date(dateString * 1e3).toLocaleDateString();
};
export const formatPrice = (price, currency, country) => {
  return new Intl.NumberFormat(country, {
    style: "currency",
    currency
  }).format(price);
};
