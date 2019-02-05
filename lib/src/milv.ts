import { ConfigurationLoader, Configuration, defaultConfiguration } from './configuration';
import { Reader } from './reader';

export default class Milv {
  private config: Configuration = defaultConfiguration;

  constructor(
    configFile?: string,
    config?: Configuration
  ) {
    this.config = this.loadConfiguration(configFile, config);
    console.log(this.config)
  }

  private loadConfiguration = (name?: string, config?: Configuration): Configuration => {
    const loader: ConfigurationLoader = new ConfigurationLoader(
      new Reader(),
    );

    const configFromFile = loader.load(name);
    return loader.mergeConfigs(configFromFile, config);
  };
}
