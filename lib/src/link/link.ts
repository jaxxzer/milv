export enum LinkType {
  External = "External",
  Internal = "Internal",
  Anchor = "Anchor",
};

export interface LinkResult {
  statusCode: boolean;
  message: string;
}

export interface LinkConfiguration {
  timeout?: number;
  requestRepeats?: number;
  allowRedirect?: boolean;
  allowSSL?: boolean;
  allowStatusCodes?: (string | RegExp)[];
}

export interface Link {
  relativePath: string;
  absolutePath: string;
  config: LinkConfiguration;
  type: LinkType;
  result: LinkResult;
}
