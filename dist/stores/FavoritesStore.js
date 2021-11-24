import {Store} from "../../_snowpack/pkg/pullstate.js";
import {PersonalShelf} from "../enum/PersonalShelf.js";
import * as persist from "../utils/persist.js";
import {getMediaByIds} from "../services/api.service.js";
import {AccountStore, updatePersonalShelves} from "./AccountStore.js";
const PERSIST_KEY_FAVORITES = `favorites${window.configId ? `-${window.configId}` : ""}`;
export const favoritesStore = new Store({
  favorites: []
});
export const restoreFavorites = async () => {
  const {user} = AccountStore.getRawState();
  const savedItems = user ? user.externalData?.favorites : persist.getItem(PERSIST_KEY_FAVORITES);
  if (savedItems) {
    const playlistItems = await getMediaByIds(savedItems.map(({mediaid}) => mediaid));
    const favorites = playlistItems.map((item) => createFavorite(item));
    favoritesStore.update((state) => {
      state.favorites = favorites;
    });
  }
};
export const serializeFavorites = (favorites) => {
  return favorites.map(({mediaid, title, tags, duration}) => ({mediaid, title, tags, duration}));
};
export const persistFavorites = () => {
  const {favorites} = favoritesStore.getRawState();
  const {user} = AccountStore.getRawState();
  if (user) {
    return updatePersonalShelves();
  }
  return persist.setItem(PERSIST_KEY_FAVORITES, serializeFavorites(favorites));
};
export const initializeFavorites = async () => {
  restoreFavorites();
};
const createFavorite = (item) => ({
  mediaid: item.mediaid,
  title: item.title,
  tags: item.tags,
  duration: item.duration,
  playlistItem: item
});
export const useFavorites = () => {
  const favorites = favoritesStore.useState((state) => state.favorites);
  const saveItem = (item) => {
    favoritesStore.update((state, original) => {
      if (!original.favorites.some(({mediaid}) => mediaid === item.mediaid)) {
        state.favorites.unshift(createFavorite(item));
      }
    });
    persistFavorites();
  };
  const removeItem = (item) => {
    favoritesStore.update((state) => {
      state.favorites = state.favorites.filter(({mediaid}) => mediaid !== item.mediaid);
    });
    persistFavorites();
  };
  const hasItem = (item) => {
    return favorites.some(({mediaid}) => mediaid === item.mediaid);
  };
  const clearList = () => {
    favoritesStore.update((state) => {
      state.favorites = [];
    });
    persistFavorites();
  };
  const getPlaylist = () => {
    return {
      feedid: PersonalShelf.Favorites,
      title: "Favorites",
      playlist: favorites.map(({playlistItem}) => playlistItem)
    };
  };
  return {saveItem, removeItem, hasItem, clearList, getPlaylist};
};
