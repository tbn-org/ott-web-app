import React, {useEffect} from "../../../_snowpack/pkg/react.js";
import {PersonalShelf, PersonalShelves} from "../../enum/PersonalShelf.js";
import usePlaylist from "../../hooks/usePlaylist.js";
import {useFavorites} from "../../stores/FavoritesStore.js";
import {useWatchHistory} from "../../stores/WatchHistoryStore.js";
import {PLAYLIST_LIMIT} from "../../config.js";
const PlaylistContainer = ({playlistId, relatedItem, onPlaylistUpdate, style, children, showEmpty = false}) => {
  const isAlternativeShelf = PersonalShelves.includes(playlistId);
  const {
    isLoading,
    error,
    data: fetchedPlaylist = {title: "", playlist: []}
  } = usePlaylist(playlistId, relatedItem?.mediaid, !isAlternativeShelf && !!playlistId, true, PLAYLIST_LIMIT);
  let playlist = fetchedPlaylist;
  const {getPlaylist: getFavoritesPlaylist} = useFavorites();
  const favoritesPlaylist = getFavoritesPlaylist();
  const {getPlaylist: getWatchHistoryPlaylist} = useWatchHistory();
  const watchHistoryPlaylist = getWatchHistoryPlaylist();
  useEffect(() => {
    if (playlist && onPlaylistUpdate)
      onPlaylistUpdate(playlist);
  }, [playlist, onPlaylistUpdate]);
  if (playlistId === PersonalShelf.Favorites)
    playlist = favoritesPlaylist;
  if (playlistId === PersonalShelf.ContinueWatching)
    playlist = watchHistoryPlaylist;
  if (!playlistId)
    return /* @__PURE__ */ React.createElement("p", null, "No playlist id");
  if (!playlist.playlist.length && !showEmpty) {
    return null;
  }
  if (relatedItem && !playlist.playlist.some(({mediaid}) => mediaid === relatedItem.mediaid)) {
    playlist.playlist.unshift(relatedItem);
  }
  return children({playlist, isLoading, error, style});
};
export default PlaylistContainer;
