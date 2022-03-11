import React, {useRef, useEffect, useCallback} from "../../../_snowpack/pkg/react.js";
import memoize from "../../../_snowpack/pkg/memoize-one.js";
import WindowScroller from "../../../_snowpack/pkg/react-virtualized/dist/commonjs/WindowScroller.js";
import List from "../../../_snowpack/pkg/react-virtualized/dist/commonjs/List.js";
import {useHistory} from "../../../_snowpack/pkg/react-router-dom.js";
import classNames from "../../../_snowpack/pkg/classnames.js";
import PlaylistContainer from "../../containers/Playlist/PlaylistContainer.js";
import {favoritesStore} from "../../stores/FavoritesStore.js";
import {AccountStore} from "../../stores/AccountStore.js";
import {ConfigStore} from "../../stores/ConfigStore.js";
import {PersonalShelf} from "../../enum/PersonalShelf.js";
import {useWatchHistory} from "../../stores/WatchHistoryStore.js";
import useBlurImageUpdater from "../../hooks/useBlurImageUpdater.js";
import ShelfComponent, {featuredTileBreakpoints, tileBreakpoints} from "../../components/Shelf/Shelf.js";
import usePlaylist from "../../hooks/usePlaylist.js";
import useBreakpoint, {Breakpoint} from "../../hooks/useBreakpoint.js";
import scrollbarSize from "../../utils/dom.js";
import {cardUrl} from "../../utils/formatting.js";
import styles from "./Home.module.css.proxy.js";
const createItemData = memoize((content) => ({content}));
const Home = () => {
  const history = useHistory();
  const config = ConfigStore.useState((state) => state.config);
  const accessModel = ConfigStore.useState((s) => s.accessModel);
  const breakpoint = useBreakpoint();
  const listRef = useRef();
  const content = config?.content;
  const itemData = createItemData(content);
  const {getPlaylist: getWatchHistoryPlaylist, getDictionary: getWatchHistoryDictionary} = useWatchHistory();
  const watchHistory = getWatchHistoryPlaylist();
  const watchHistoryDictionary = getWatchHistoryDictionary();
  const favorites = favoritesStore.useState((state) => state.favorites);
  const {data: {playlist} = {playlist: []}} = usePlaylist(content[0]?.playlistId);
  const updateBlurImage = useBlurImageUpdater(playlist);
  const user = AccountStore.useState((state) => state.user);
  const subscription = !!AccountStore.useState((state) => state.subscription);
  const onCardClick = useCallback((playlistItem, playlistId) => {
    history.push(cardUrl(playlistItem, playlistId, playlistId === PersonalShelf.ContinueWatching));
  }, [history]);
  const onCardHover = useCallback((playlistItem) => updateBlurImage(playlistItem.image), [updateBlurImage]);
  const rowRenderer = ({index, key, style, itemData: itemData2}) => {
    if (!itemData2?.content?.[index])
      return null;
    const contentItem = itemData2.content[index];
    return /* @__PURE__ */ React.createElement(PlaylistContainer, {
      key: contentItem.playlistId,
      playlistId: contentItem.playlistId,
      style
    }, ({playlist: playlist2, error, isLoading, style: style2}) => /* @__PURE__ */ React.createElement("div", {
      key,
      style: style2,
      role: "row",
      className: classNames(styles.shelfContainer, {[styles.featured]: contentItem.featured})
    }, /* @__PURE__ */ React.createElement("div", {
      role: "cell"
    }, /* @__PURE__ */ React.createElement(ShelfComponent, {
      loading: isLoading,
      error,
      playlist: playlist2,
      watchHistory: playlist2.feedid === PersonalShelf.ContinueWatching ? watchHistoryDictionary : void 0,
      onCardClick,
      onCardHover,
      enableTitle: contentItem.enableText,
      enableCardTitles: config.options.shelfTitles,
      title: playlist2.title,
      featured: contentItem.featured === true,
      accessModel,
      isLoggedIn: !!user,
      hasSubscription: !!subscription
    }))));
  };
  const calculateHeight = (index) => {
    const item = content[index];
    const isDesktop = breakpoint >= Breakpoint.lg;
    const isMobile = breakpoint === Breakpoint.xs;
    const isTablet = !isDesktop && !isMobile;
    if (!item)
      return 0;
    if (item.playlistId === PersonalShelf.ContinueWatching && !watchHistory.playlist.length)
      return 0;
    if (item.playlistId === PersonalShelf.Favorites && !favorites.length)
      return 0;
    const calculateFeatured = () => {
      const tilesToShow = featuredTileBreakpoints[breakpoint];
      const shelfMetaHeight = 50;
      const shelfHorizontalMargin = isDesktop ? document.body.offsetWidth * 0.4 : isTablet ? document.body.offsetWidth * 0.2 : 0;
      const cardWidth = (document.body.offsetWidth - shelfHorizontalMargin) / tilesToShow;
      const cardHeight = cardWidth * (9 / 16);
      return cardHeight + shelfMetaHeight;
    };
    const calculateRegular = () => {
      const tilesToShow = tileBreakpoints[breakpoint];
      const shelfTitlesHeight = item.enableText ? 40 : 0;
      const shelfMetaHeight = shelfTitlesHeight + 12;
      const cardMetaHeight = config.options.shelfTitles ? 40 : 0;
      const shelfHorizontalMargin = isMobile ? 76 : 0;
      const cardWidth = (document.body.offsetWidth - shelfHorizontalMargin) / tilesToShow;
      const cardHeight = cardWidth * (9 / 16);
      return cardHeight + shelfMetaHeight + cardMetaHeight;
    };
    return item.featured ? calculateFeatured() : calculateRegular();
  };
  useEffect(() => {
    if (favorites || watchHistory) {
      listRef.current?.recomputeRowHeights();
    }
  }, [favorites, watchHistory]);
  return /* @__PURE__ */ React.createElement("div", {
    className: styles.home
  }, /* @__PURE__ */ React.createElement(WindowScroller, {
    onResize: () => listRef.current?.recomputeRowHeights()
  }, ({height, isScrolling, onChildScroll, scrollTop}) => /* @__PURE__ */ React.createElement(List, {
    className: styles.list,
    tabIndex: -1,
    ref: listRef,
    autoHeight: true,
    height,
    isScrolling,
    onScroll: onChildScroll,
    rowCount: content.length,
    getScrollbarSize: scrollbarSize,
    rowHeight: ({index}) => calculateHeight(index),
    rowRenderer: ({index, key, style}) => rowRenderer({index, key, style, itemData}),
    scrollTop,
    width: document.body.offsetWidth,
    isScrollingOptOut: true,
    overscanRowCount: 3
  })));
};
export default Home;
