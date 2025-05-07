import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const balance = getBankAccount(100).getBalance();
    expect(balance).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(100);
    expect(() => account.withdraw(200)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const account = getBankAccount(100);
    const account2 = getBankAccount(100);
    expect(() => account.transfer(200, account2)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(100);
    expect(() => account.transfer(200, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const balance = getBankAccount(100).deposit(200).getBalance();
    expect(balance).toBe(300);
  });

  test('should withdraw money', () => {
    const balance = getBankAccount(200).withdraw(100).getBalance();
    expect(balance).toBe(100);
  });

  test('should transfer money', () => {
    const account = getBankAccount(100);
    const account2 = getBankAccount(100);
    expect(account.transfer(50, account2).getBalance()).toBe(50);
    expect(account2.getBalance()).toBe(150);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const result = await getBankAccount(100).fetchBalance();
    if (result) {
      expect(typeof result).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(200);

    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(200);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(100);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);

    await expect(account.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
