import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';
const mockTimeout = 1000;

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, mockTimeout);
    expect(setTimeout).toHaveBeenCalledWith(callback, mockTimeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, mockTimeout);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(mockTimeout);
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, mockTimeout);
    expect(setIntervalSpy).toHaveBeenCalledWith(callback, mockTimeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, mockTimeout);
    jest.advanceTimersByTime(3000);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

jest.mock('fs');
jest.mock('fs/promises');
jest.mock('path');

describe('readFileAsynchronously', () => {
  const filePath = 'test.txt';
  const mockText = 'Test text';
  const mockPath = '/mock/path/test.txt';

  beforeEach(() => {
    jest.spyOn(path, 'join').mockReturnValue(mockPath);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    await readFileAsynchronously(filePath);
    expect(path.join).toHaveBeenCalledWith(__dirname, filePath);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const result = await readFileAsynchronously(filePath);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fsPromises, 'readFile').mockResolvedValue(Buffer.from(mockText));
    const result = await readFileAsynchronously(filePath);
    expect(result).toBe(mockText);
    expect(fs.existsSync).toHaveBeenCalledWith(mockPath);
    expect(fsPromises.readFile).toHaveBeenCalledWith(mockPath);
  });
});
