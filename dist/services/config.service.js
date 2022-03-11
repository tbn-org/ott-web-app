import {string, boolean, array, object} from "../../_snowpack/pkg/yup.js";
import {PersonalShelf} from "../enum/PersonalShelf.js";
const contentSchema = object({
  playlistId: string().defined(),
  featured: boolean().notRequired(),
  enableText: boolean().notRequired()
}).defined();
const menuSchema = object().shape({
  label: string().defined(),
  playlistId: string().defined(),
  filterTags: string().notRequired()
});
const optionsSchema = object({
  backgroundColor: string().nullable(),
  highlightColor: string().nullable(),
  enableContinueWatching: boolean().notRequired(),
  headerBackground: string().notRequired(),
  enableCasting: boolean().notRequired(),
  enableSharing: boolean().notRequired(),
  dynamicBlur: boolean().notRequired(),
  posterFading: boolean().notRequired(),
  shelfTitles: boolean().notRequired()
});
const configSchema = object({
  id: string().notRequired(),
  siteName: string().defined(),
  description: string().defined(),
  footerText: string().nullable(),
  player: string().defined(),
  recommendationsPlaylist: string().nullable(),
  searchPlaylist: string().nullable(),
  analyticsToken: string().nullable(),
  adSchedule: string().nullable(),
  assets: object({
    banner: string().notRequired()
  }).defined(),
  content: array().of(contentSchema),
  menu: array().of(menuSchema),
  options: optionsSchema.notRequired(),
  cleengId: string().nullable(),
  cleengSandbox: boolean().default(true),
  genres: array().of(string()).notRequired(),
  json: object().notRequired()
}).defined();
const loadConfig = async (configLocation) => {
  if (!configLocation) {
    return null;
  }
  const response = await fetch(configLocation, {
    headers: {
      Accept: "application/json"
    },
    method: "GET"
  });
  if (!response.ok) {
    throw new Error("Failed to load the config");
  }
  const data = await response.json();
  addPersonalShelves(data);
  addContentDefaultOptions(data);
  if (data.version) {
    return parseDeprecatedConfig(data);
  }
  return data;
};
const addPersonalShelves = (data) => {
  if (!data.content.some(({playlistId}) => playlistId === PersonalShelf.Favorites)) {
    data.content.push({playlistId: PersonalShelf.Favorites});
  }
  if (data.options.enableContinueWatching) {
    if (!data.content.some(({playlistId}) => playlistId === PersonalShelf.ContinueWatching)) {
      data.content.splice(1, 0, {playlistId: PersonalShelf.ContinueWatching});
    }
  }
};
const addContentDefaultOptions = (data) => {
  data.content = data.content.map((content) => Object.assign({enableText: true, featured: false}, content));
};
const parseDeprecatedConfig = (config) => {
  if (!config.description.startsWith("{")) {
    return config;
  }
  try {
    const {menu, id, analyticsToken, adSchedule, description, cleengId, cleengSandbox, json, ...options} = JSON.parse(config.description);
    const updatedConfig = {
      menu: menu || [],
      id: id || "showcase-id",
      analyticsToken: analyticsToken || null,
      adSchedule: adSchedule || null,
      description: description || "",
      cleengId,
      cleengSandbox,
      options: Object.assign(config.options, options),
      json: config.json || {}
    };
    if (typeof json === "object" && json !== null) {
      updatedConfig.json = Object.assign(updatedConfig.json, json);
    }
    return Object.assign(config, updatedConfig);
  } catch (error) {
    throw new Error("Failed to JSON parse the `description` property");
  }
};
export const validateConfig = (config) => {
  return configSchema.validate(config, {
    strict: true
  });
};
export default loadConfig;
