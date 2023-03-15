import { StockRepository } from './stock.repository';

describe('StockRepository', () => {
  const testDataPath = '../../stock.json';

  describe('getStockBySku', () => {
    const stockData = [
      { sku: '123', qty: 10 },
      { sku: '456', qty: 20 },
      { sku: '789', qty: 30 },
    ];

    beforeEach(() => {
      jest.resetModules();
    });

    it('should return the stock data for the given sku', async () => {
      jest.doMock(testDataPath, () => JSON.stringify(stockData));
      const repository = new StockRepository(testDataPath);
      const result = await repository.getStockBySku('456');
      expect(result).toEqual({ sku: '456', qty: 20 });
    });

    it('should return undefined if the sku is not found', async () => {
      jest.doMock(testDataPath, () => JSON.stringify(stockData));
      const repository = new StockRepository(testDataPath);
      const result = await repository.getStockBySku('non-existent-sku');
      expect(result).toBeUndefined();
    });

    it('should throw an error if the file cannot be read', async () => {
      jest.doMock(testDataPath, () => {
        throw new Error('File not found');
      });
      const repository = new StockRepository(testDataPath);
      await expect(repository.getStockBySku('123')).rejects.toThrow('File not found');
    });

    it('should return the first stock data with the matching sku if there are duplicates', async () => {
      const duplicateStockData = [
        { sku: '123', qty: 10 },
        { sku: '123', qty: 20 },
      ];
      jest.doMock(testDataPath, () => JSON.stringify(duplicateStockData));
      const repository = new StockRepository(testDataPath);
      const result = await repository.getStockBySku('123');
      expect(result).toEqual({ sku: '123', qty: 10 });
    });
  });
});