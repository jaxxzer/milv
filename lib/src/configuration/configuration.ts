export interface BaseConfiguration {
  acceptedSchemes?: string[];
  excludedSchemes?: string[];
  whiteList?: (string | RegExp)[];
  timeout?: number;
  requestRepeats?: number;
  allowRedirect?: boolean;
  allowSSL?: boolean;
  allowStatusCodes?: (string | RegExp)[];
  allowCodeBlocks?: boolean;
  allowInlineCodes?: boolean;
  ignoreInternal?: boolean;
  ignoreExternal?: boolean;
}

export interface FileConfigurationMetadata {
  name: string | RegExp,
  config: FileConfiguration,
  links?: LinkConfigurationMetadata[],
}

export interface Configuration extends BaseConfiguration {
  basePath?: string;
  blackList?: (string | RegExp)[];
  files?: FileConfigurationMetadata[];
  verbose?: boolean;
}

export interface FileConfiguration extends BaseConfiguration {}

export interface LinkConfigurationMetadata {
  name: string | RegExp,
  config: LinkConfiguration,
}

export interface LinkConfiguration {
  timeout?: number;
  requestRepeats?: number;
  allowRedirect?: boolean;
}

//Add interfaces for plugins
export interface PluginConfiguration {
  path: string;
  context: any;
}
