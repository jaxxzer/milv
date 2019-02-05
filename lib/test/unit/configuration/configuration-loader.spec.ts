import { Configuration, ConfigurationLoader } from '../../../src/configuration';
import milvConfigFiles from '../../../src/configuration/milv-config-files';
import { Reader } from '../../../src/reader';

import {
    milvConfigMock,
} from "./_helpers";

describe('Configuration Loader', () => {
  let reader: Reader;

  beforeAll(() => {
    const mock = jest.fn();
    mock.mockImplementation(() => {
      return {
        read: jest.fn(() => 
          Promise.resolve(
            JSON.stringify(milvConfigMock),
          ),
        ),
        readAnyOf: jest.fn(() =>
          Promise.resolve(
            JSON.stringify(milvConfigMock),
          ),
        ),
      };
    });
    reader = mock();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should call reader.read when load', async () => {
    const fileName: string = "fileName";
    const loader: ConfigurationLoader = new ConfigurationLoader(reader);
    const configuration = await loader.load(fileName);

    expect(reader.read).toHaveBeenCalledWith(fileName);
    expect(configuration).toEqual(milvConfigMock);
  });

  it('should call reader.readAnyOf when load', async () => {
    const loader: ConfigurationLoader = new ConfigurationLoader(reader);
    const configuration = await loader.load();

    expect(reader.readAnyOf).toHaveBeenCalledWith(milvConfigFiles);
    expect(configuration).toEqual(milvConfigMock);
  });
});
