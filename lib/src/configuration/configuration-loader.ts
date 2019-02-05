import * as extend from 'extend';
import { safeLoad as yamlSafeLoad } from 'js-yaml'

import { Reader } from '../reader';
import { Configuration } from './configuration';
import { IConfigurationLoader } from './configuration-loader.interface';
import { defaultConfiguration } from './default';
import defaultMilvConfigFiles from './milv-config-files';

export class ConfigurationLoader implements IConfigurationLoader {
  constructor(
    private readonly reader: Reader,
  ) {}

  load(name?: string): Configuration | undefined {
    if (name) {
      try {
        const configuration: string = this.reader.readSync(name)
        return this.parse(configuration)
      } catch(err) {
        throw new Error("dupa")
      }
    }

    const content: string | undefined = this.reader.readAnyOfSync(defaultMilvConfigFiles);

    if (!content) return defaultConfiguration;
    return this.parse(content)
  }

  mergeConfigs(configuration?: Configuration, previous?: Configuration): Configuration {
    const source = previous ? previous : defaultConfiguration;

    if (!configuration) {
      return source;
    }

    return extend(true, {}, source, configuration);
  }

  private parse(configuration: string): Configuration | undefined {
    try {
      return yamlSafeLoad(configuration);
    } catch(err) {
      return JSON.parse(configuration);
    }
  }
}
