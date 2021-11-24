import {addQueryParams} from "../utils/formatting.js";
import {API_BASE_URL} from "../config.js";
export const getDataOrThrow = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    const message = `Request '${response.url}' failed with ${response.status}`;
    throw new Error(data?.message || message);
  }
  return data;
};
export const getPlaylistById = (id, relatedMediaId, limit) => {
  const url = addQueryParams(`${API_BASE_URL}/v2/playlists/${id}`, {
    related_media_id: relatedMediaId,
    page_limit: limit?.toString()
  });
  return fetch(url).then(getDataOrThrow);
};
export const getSearchPlaylist = (playlistId, query) => {
  return fetch(`${API_BASE_URL}/v2/playlists/${playlistId}?search=${encodeURIComponent(query)}`).then(getDataOrThrow);
};
export const getMediaById = (id) => {
  return fetch(`${API_BASE_URL}/v2/media/${id}`).then((res) => getDataOrThrow(res)).then((data) => data.playlist[0]);
};
export const getMediaByIds = async (ids) => {
  const responses = await Promise.all(ids.map((id) => getMediaById(id)));
  function notEmpty(value) {
    return value !== null && value !== void 0;
  }
  return responses.filter(notEmpty);
};
