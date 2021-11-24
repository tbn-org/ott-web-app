import {useQuery} from "../../_snowpack/pkg/react-query.js";
import {getPlaylistById} from "../services/api.service.js";
export default function useRecommendedPlaylist(playlistId, relatedItem, enabled = true) {
  return useQuery(["recommendationsPlaylist", playlistId, relatedItem?.mediaid], () => getPlaylistById(playlistId, relatedItem?.mediaid).then((playlist) => {
    if (playlist?.playlist && relatedItem && !playlist.playlist.some((item) => item.mediaid === relatedItem.mediaid)) {
      playlist.playlist.unshift(relatedItem);
    }
    return playlist;
  }), {
    enabled: !!playlistId && !!relatedItem && enabled,
    retry: false
  });
}
