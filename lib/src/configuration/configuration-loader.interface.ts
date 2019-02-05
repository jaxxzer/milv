import { Configuration } from './configuration';

export interface IConfigurationLoader {
  load(name?: string): Configuration | undefined;
  mergeConfigs(configuration?: Configuration, previous?: Configuration): Configuration;
}
