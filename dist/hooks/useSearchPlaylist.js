import {useQuery} from "../../_snowpack/pkg/react-query.js";
import {generatePlaylistPlaceholder} from "../utils/collection.js";
import {getSearchPlaylist} from "../services/api.service.js";
const placeholderData = generatePlaylistPlaceholder();
export default function useSearchPlaylist(playlistId, query, usePlaceholderData = true) {
  return useQuery(["playlist", playlistId, query], () => {
    return getSearchPlaylist(playlistId, query);
  }, {
    enabled: !!playlistId && !!query,
    placeholderData: usePlaceholderData ? placeholderData : void 0,
    keepPreviousData: true
  });
}
