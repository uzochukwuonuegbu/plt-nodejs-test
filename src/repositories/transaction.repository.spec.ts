import * as path from 'path';
import { TransactionRepository } from './transaction.repository';

describe('TransactionRepository', () => {
  const testDataPath = path.resolve('transactions.json');

  describe('getTransactions', () => {
    const txData = [
        { "sku": "SKU001", "qty": 5, "type": "decreased", "timestamp": "2022-02-01T09:15:00Z" },
        { "sku": "SKU001", "qty": 3, "type": "decreased", "timestamp": "2022-02-02T11:30:00Z" },
        { "sku": "SKU001", "qty": 2, "type": "decreased", "timestamp": "2022-02-03T13:45:00Z" },
        { "sku": "SKU001", "qty": 5, "type": "decreased", "timestamp": "2022-02-04T10:00:00Z" },
        { "sku": "SKU002", "qty": 5, "type": "increased", "timestamp": "2022-02-01T09:15:00Z" },
        { "sku": "SKU002", "qty": 5, "type": "decreased", "timestamp": "2022-02-02T11:30:00Z" },
        { "sku": "SKU003", "qty": 2, "type": "increased", "timestamp": "2022-02-03T13:45:00Z" },
        { "sku": "SKU003", "qty": 3, "type": "decreased", "timestamp": "2022-02-04T10:00:00Z" },
        { "sku": "SKU003", "qty": 1, "type": "decreased", "timestamp": "2022-02-05T12:30:00Z" },
        { "sku": "SKU004", "qty": 10, "type": "increased", "timestamp": "2022-02-01T09:15:00Z" },
        { "sku": "SKU004", "qty": 5, "type": "decreased", "timestamp": "2022-02-02T11:30:00Z" },
        { "sku": "SKU005", "qty": 2, "type": "decreased", "timestamp": "2022-02-03T13:45:00Z" },
        { "sku": "SKU005", "qty": 3, "type": "decreased", "timestamp": "2022-02-04T10:00:00Z" },
        { "sku": "SKU005", "qty": 5, "type": "increased", "timestamp": "2022-02-05T12:30:00Z" },
        { "sku": "SKU005", "qty": 5, "type": "decreased", "timestamp": "2022-02-06T14:45:00Z" },
        { "sku": "SKU006", "qty": 5, "type": "increased", "timestamp": "2022-02-01T09:15:00Z" },
        { "sku": "SKU006", "qty": 5, "type": "decreased", "timestamp": "2022-02-02T11:30:00Z" }
      ];

    beforeEach(() => {
      jest.resetModules();
    });

    it('should read file and parse data', async () => {
      jest.doMock(testDataPath, () => JSON.stringify(txData));
      const repository = new TransactionRepository(testDataPath);
      const result = await repository.getTransactions();
      console.log({ result });
      expect(result).toEqual(txData);
    });

    describe('getTransactionsBySku', () => {
        it('should return an array of transactions for a given SKU', async () => {
            jest.doMock(testDataPath, () => JSON.stringify(txData));
            const repository = new TransactionRepository(testDataPath);
            const result = await repository.getTransactionsBySku('SKU002');
            expect(result).toEqual([
                { "sku": "SKU002", "qty": 5, "type": "increased", "timestamp": "2022-02-01T09:15:00Z" },
                { "sku": "SKU002", "qty": 5, "type": "decreased", "timestamp": "2022-02-02T11:30:00Z" }
            ]);
        });
    })
  });
});