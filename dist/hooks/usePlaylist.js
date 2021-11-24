import {useQuery} from "../../_snowpack/pkg/react-query.js";
import {generatePlaylistPlaceholder} from "../utils/collection.js";
import {getPlaylistById} from "../services/api.service.js";
const placeholderData = generatePlaylistPlaceholder(30);
export default function usePlaylist(playlistId, relatedMediaId, enabled = true, usePlaceholderData = true, limit) {
  return useQuery(["playlist", playlistId, relatedMediaId], () => getPlaylistById(playlistId, relatedMediaId, limit), {
    enabled: !!playlistId && enabled,
    placeholderData: usePlaceholderData ? placeholderData : void 0,
    retry: false
  });
}
