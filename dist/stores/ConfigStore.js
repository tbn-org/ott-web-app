import {Store} from "../../_snowpack/pkg/pullstate.js";
export const ConfigStore = new Store({
  configLocation: "",
  isLoading: false,
  config: {
    id: "",
    siteName: "",
    description: "",
    footerText: "",
    player: "",
    assets: {},
    content: [],
    menu: [],
    cleengSandbox: true,
    options: {
      shelfTitles: true
    }
  },
  accessModel: "SVOD"
});
