import {
  buildSearchEngine,
  getSampleSearchEngineConfiguration,
} from "@coveo/headless";
export const engine = buildSearchEngine({
  configuration: getSampleSearchEngineConfiguration(),
});
