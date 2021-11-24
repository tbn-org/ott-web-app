import {useContext, useEffect, useState} from "../../_snowpack/pkg/react.js";
import {ConfigContext} from "../providers/ConfigProvider.js";
const useOttAnalytics = (item, feedId = "") => {
  const config = useContext(ConfigContext);
  const [player, setPlayer] = useState(null);
  useEffect(() => {
    if (!window.jwpltx || !config.analyticsToken || !player || !item) {
      return;
    }
    const playlistItemHandler = () => {
      if (!config.analyticsToken)
        return;
      window.jwpltx.ready(config.analyticsToken, window.location.hostname, feedId, item.mediaid, item.title);
    };
    const completeHandler = () => {
      window.jwpltx.complete();
    };
    const timeHandler = ({position, duration}) => {
      window.jwpltx.time(position, duration);
    };
    const adImpressionHandler = () => {
      window.jwpltx.adImpression();
    };
    player.on("playlistItem", playlistItemHandler);
    player.on("complete", completeHandler);
    player.on("time", timeHandler);
    player.on("adImpression", adImpressionHandler);
    return () => {
      player.off("playlistItem", playlistItemHandler);
      player.off("complete", completeHandler);
      player.off("time", timeHandler);
      player.off("adImpression", adImpressionHandler);
    };
  }, [player]);
  return setPlayer;
};
export default useOttAnalytics;
