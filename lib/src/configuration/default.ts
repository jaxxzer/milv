import { Configuration } from './configuration';

export const defaultConfiguration: Configuration = {
  basePath: "",
  timeout: 60,
  requestRepeats: 1,
  allowRedirect: false,
  allowSSL: false,
  allowStatusCodes: [/2[0-9][0-9]/],
  allowCodeBlocks: false,
  allowInlineCodes: false,
  ignoreInternal: false,
  ignoreExternal: false,
  verbose: false,
};
