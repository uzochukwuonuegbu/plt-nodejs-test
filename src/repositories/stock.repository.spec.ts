import * as path from 'path';
import { StockRepository } from './stock.repository';

describe('StockRepository', () => {
  const testDataPath = path.resolve('stock.json');

  describe('getStockBySku', () => {
    const stockData = [
        { sku: 'SKU001', qty: 10, updatedAt: '2022-02-01T09:15:00Z' },
        { sku: 'SKU002', qty: 0, updatedAt: '2022-02-01T09:15:00Z' },
        { sku: 'SKU003', qty: 5, updatedAt: '2022-02-01T09:15:00Z' },
        { sku: 'SKU004', qty: 20, updatedAt: '2022-02-01T09:15:00Z' },
        { sku: 'SKU005', qty: 15, updatedAt: '2022-02-01T09:15:00Z' },
        { sku: 'SKU006', qty: 30, updatedAt: '2022-02-01T09:15:00Z' },
        { sku: 'SKU007', qty: 0, updatedAt: '2022-02-01T09:15:00Z' },
        { sku: 'SKU008', qty: 20, updatedAt: '2022-02-01T09:15:00Z' },
      ];

    beforeEach(() => {
      jest.resetModules();
    });

    it('should return the stock data for the given sku', async () => {
      jest.doMock(testDataPath, () => JSON.stringify(stockData));
      const repository = new StockRepository(testDataPath);
      const result = await repository.getStockBySku('SKU001');
      expect(result).toEqual({ sku: 'SKU001', qty: 10, updatedAt: '2022-02-01T09:15:00Z' });
    });

    it('should return undefined if the sku is not found', async () => {
      jest.doMock(testDataPath, () => JSON.stringify(stockData));
      const repository = new StockRepository(testDataPath);
      const result = await repository.getStockBySku('SKU009');
      expect(result).toBeUndefined();
    });

    it('should return the first stock data with the matching sku if there are duplicates', async () => {
      const duplicateStockData = [
        { sku: 'SKU002', qty: 0, updatedAt: '2022-02-01T09:15:00Z' },
      ];
      jest.doMock(testDataPath, () => JSON.stringify(duplicateStockData));
      const repository = new StockRepository(testDataPath);
      const result = await repository.getStockBySku('SKU002');
      expect(result).toEqual({ sku: 'SKU002', qty: 0, updatedAt: '2022-02-01T09:15:00Z' });
    });
  });
});
