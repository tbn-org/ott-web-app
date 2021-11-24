export const getSeriesId = (item) => {
  if (!item) {
    return void 0;
  }
  return item["seriesPlayListId"] || item.seriesPlaylistId || item.seriesId;
};
export const isSeriesPlaceholder = (item) => {
  return typeof getSeriesId(item) !== "undefined";
};
export const isEpisode = (item) => {
  return item && typeof item.episodeNumber !== "undefined";
};
export const getSeriesIdFromEpisode = (item) => {
  if (!item || !isEpisode(item)) {
    return null;
  }
  const tags = item.tags ? item.tags.split(",") : [];
  const seriesIdTag = tags.find(function(tag) {
    return /seriesid_([\w\d]+)/i.test(tag);
  });
  if (seriesIdTag) {
    return seriesIdTag.split("_")[1];
  }
  return null;
};
