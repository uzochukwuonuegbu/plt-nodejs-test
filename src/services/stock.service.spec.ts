import { StockData } from '../types';
import { StockService } from './stock.service';

const mockRepository = {
  filePath: 'test-file-path',
  getStockBySku: jest.fn(),
};

const service = new StockService(mockRepository as any);

describe('StockService', () => {
  describe('getStockBySku', () => {
    test('should return the stock data for the given sku', async () => {
      const expectedStock: StockData = {
        sku: '123',
        qty: 10,
        updatedAt: new Date(),
      };
      mockRepository.getStockBySku.mockResolvedValueOnce(expectedStock);

      const result = await service.getStockBySku(expectedStock.sku);

      expect(result).toEqual(expectedStock);
      expect(mockRepository.getStockBySku).toHaveBeenCalledWith(expectedStock.sku);
    });

    test('should throw an error if stock data is not found', async () => {
      const sku = '123';
      mockRepository.getStockBySku.mockRejectedValueOnce('rejected');

      expect(service.getStockBySku(sku)).rejects.toBe('rejected');
      expect(mockRepository.getStockBySku).toHaveBeenCalledWith(sku);
    });
  });
});