import {Store} from "../../_snowpack/pkg/pullstate.js";
import {VideoProgressMinMax} from "../config.js";
import {PersonalShelf} from "../enum/PersonalShelf.js";
import {getMediaById} from "../services/api.service.js";
import * as persist from "../utils/persist.js";
import {AccountStore, updatePersonalShelves} from "./AccountStore.js";
const PERSIST_KEY_WATCH_HISTORY = `history${window.configId ? `-${window.configId}` : ""}`;
export const watchHistoryStore = new Store({
  watchHistory: [],
  playlistItemsLoaded: false
});
export const restoreWatchHistory = async () => {
  const {user} = AccountStore.getRawState();
  const savedItems = user ? user.externalData?.history : persist.getItem(PERSIST_KEY_WATCH_HISTORY);
  if (savedItems) {
    watchHistoryStore.update((state) => {
      state.watchHistory = savedItems;
    });
    const watchHistory = await Promise.all(savedItems.map(async (item) => createWatchHistoryItem(await getMediaById(item.mediaid), {
      duration: item.duration,
      progress: item.progress
    })));
    watchHistoryStore.update((state) => {
      state.watchHistory = watchHistory.filter((item) => !!item.mediaid);
      state.playlistItemsLoaded = true;
    });
  }
};
export const serializeWatchHistory = (watchHistory) => {
  return watchHistory.map(({mediaid, title, tags, duration, progress}) => ({
    mediaid,
    title,
    tags,
    duration,
    progress
  }));
};
const persistWatchHistory = () => {
  const {watchHistory} = watchHistoryStore.getRawState();
  const {user} = AccountStore.getRawState();
  if (user) {
    return updatePersonalShelves();
  }
  return persist.setItem(PERSIST_KEY_WATCH_HISTORY, serializeWatchHistory(watchHistory));
};
export const initializeWatchHistory = () => {
  restoreWatchHistory();
};
export const createWatchHistoryItem = (item, videoProgress) => {
  return {
    mediaid: item?.mediaid,
    title: item?.title,
    tags: item?.tags,
    duration: videoProgress.duration,
    progress: videoProgress.progress,
    playlistItem: item
  };
};
export const useWatchHistory = () => {
  const watchHistory = watchHistoryStore.useState((state) => state.watchHistory);
  const saveItem = (item, getProgress) => {
    const {watchHistory: watchHistory2} = watchHistoryStore.getRawState();
    const videoProgress = getProgress();
    if (!videoProgress)
      return;
    const watchHistoryItem = createWatchHistoryItem(item, videoProgress);
    const index = watchHistory2.findIndex(({mediaid}) => mediaid === watchHistoryItem.mediaid);
    if (index > -1) {
      watchHistoryStore.update((state) => {
        state.watchHistory[index] = watchHistoryItem;
      });
    } else {
      watchHistoryStore.update((state) => {
        state.watchHistory.unshift(watchHistoryItem);
      });
    }
    persistWatchHistory();
  };
  const removeItem = (item) => {
    watchHistoryStore.update((state) => {
      state.watchHistory = state.watchHistory.filter(({mediaid}) => mediaid !== item.mediaid);
    });
    persistWatchHistory();
  };
  const hasItem = (item) => {
    return watchHistory.some(({mediaid}) => mediaid === item.mediaid);
  };
  const getPlaylist = () => ({
    feedid: PersonalShelf.ContinueWatching,
    title: "Continue watching",
    playlist: watchHistory.filter(({playlistItem, progress}) => !!playlistItem && progress > VideoProgressMinMax.Min && progress < VideoProgressMinMax.Max).map(({playlistItem}) => playlistItem)
  });
  const getDictionary = () => {
    return watchHistory.reduce((dict, item) => {
      dict[item.mediaid] = item.progress;
      return dict;
    }, {});
  };
  return {saveItem, removeItem, hasItem, getPlaylist, getDictionary};
};
