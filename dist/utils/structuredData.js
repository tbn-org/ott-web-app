import {episodeURL, movieURL} from "./formatting.js";
import {secondsToISO8601} from "./datetime.js";
export const generateSeriesMetadata = (seriesPlaylist) => {
  const seriesCanonical = `${window.location.origin}${episodeURL(seriesPlaylist)}`;
  return {
    "@type": "TVSeries",
    "@id": seriesCanonical,
    name: seriesPlaylist.title,
    numberOfEpisodes: seriesPlaylist.playlist.length,
    numberOfSeasons: seriesPlaylist.playlist.reduce(function(list, playlistItem) {
      return !playlistItem.seasonNumber || list.includes(playlistItem.seasonNumber) ? list : list.concat(playlistItem.seasonNumber);
    }, []).length
  };
};
export const generateEpisodeJSONLD = (seriesPlaylist, episode) => {
  const episodeCanonical = `${window.location.origin}${episodeURL(seriesPlaylist, episode.mediaid)}`;
  const seriesMetadata = generateSeriesMetadata(seriesPlaylist);
  return JSON.stringify({
    "@context": "http://schema.org/",
    "@type": "TVEpisode",
    "@id": episodeCanonical,
    episodeNumber: episode.episodeNumber,
    seasonNumber: episode.seasonNumber,
    name: episode.title,
    uploadDate: secondsToISO8601(episode.pubdate),
    partOfSeries: seriesMetadata
  });
};
export const generateMovieJSONLD = (item) => {
  const movieCanonical = `${window.location.origin}${movieURL(item)}`;
  return JSON.stringify({
    "@context": "http://schema.org/",
    "@type": "VideoObject",
    "@id": movieCanonical,
    name: item.title,
    description: item.description,
    duration: secondsToISO8601(item.duration, true),
    thumbnailUrl: item.image,
    uploadDate: secondsToISO8601(item.pubdate)
  });
};
