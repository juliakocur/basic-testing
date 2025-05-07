import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const createMock = jest.fn().mockResolvedValue({ data: 'success' });
    (axios.create as jest.Mock).mockReturnValue({ get: createMock });
    await throttledGetDataFromApi('/someurl');
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const createMock = jest.fn().mockResolvedValue({ data: 'ok' });
    (axios.create as jest.Mock).mockReturnValue({ get: createMock });
    await throttledGetDataFromApi('/somename');
    expect(createMock).toHaveBeenCalledWith('/somename');
  });

  test('should return response data', async () => {
    const createMock = jest.fn().mockResolvedValue({ data: 'value' });
    (axios.create as jest.Mock).mockReturnValue({ get: createMock });
    const result = await throttledGetDataFromApi('/data');
    expect(result).toEqual('value');
  });
});
