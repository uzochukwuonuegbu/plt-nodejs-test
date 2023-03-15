import { InventoryController } from './inventory.controller';

const mockStockService = {
    getStockBySku: jest.fn(),
};
const mockTransactionService = {
  getTransactionQtyBySku: jest.fn(),
  getTransactionsQtySinceStockUpdate: jest.fn(),
};

const controller = new InventoryController(
  mockStockService as any,
  mockTransactionService as any,
);

const mockStock = {
  sku: 'PLT123',
  qty: 10,
  updatedAt: Date.now(),
};

describe('InventoryController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getStockLevel', () => {
    it('should return current stock level for a given SKU when stock exists', async () => {
      mockStockService.getStockBySku.mockResolvedValueOnce(mockStock);
      mockTransactionService.getTransactionsQtySinceStockUpdate.mockResolvedValueOnce(5);

      const result = await controller.getStockLevel(mockStock.sku);

      expect(mockStockService.getStockBySku).toHaveBeenCalledTimes(1);
      expect(mockStockService.getStockBySku).toHaveBeenCalledWith(mockStock.sku);
      expect(mockTransactionService.getTransactionsQtySinceStockUpdate).toHaveBeenCalledTimes(1);
      expect(mockTransactionService.getTransactionsQtySinceStockUpdate).toHaveBeenCalledWith(mockStock.sku, mockStock.qty, mockStock.updatedAt);
      expect(result).toEqual({ sku: mockStock.sku, qty: 5 });
    });

    it('should return current stock level for a given SKU when stock does not exist', async () => {
      mockStockService.getStockBySku.mockResolvedValueOnce(undefined);
      mockTransactionService.getTransactionQtyBySku.mockResolvedValueOnce(3);

      const result = await controller.getStockLevel(mockStock.sku);

      expect(mockStockService.getStockBySku).toHaveBeenCalledTimes(1);
      expect(mockStockService.getStockBySku).toHaveBeenCalledWith(mockStock.sku);
      expect(mockTransactionService.getTransactionQtyBySku).toHaveBeenCalledTimes(1);
      expect(mockTransactionService.getTransactionQtyBySku).toHaveBeenCalledWith(mockStock.sku, 0);
      expect(result).toEqual({ sku: mockStock.sku, qty: 3 });
    });

    it('should throw an error when SKU is not found', async () => {
      mockStockService.getStockBySku.mockResolvedValueOnce(undefined);
      mockTransactionService.getTransactionQtyBySku.mockResolvedValueOnce(undefined);

      await expect(controller.getStockLevel(mockStock.sku)).rejects.toThrowError(`No Stock or Transaction with SKU: ${mockStock.sku}, Found`);
    });

    it('should throw an error when current stock level is negative', async () => {
      mockStockService.getStockBySku.mockResolvedValueOnce(mockStock);
      mockTransactionService.getTransactionsQtySinceStockUpdate.mockResolvedValueOnce(-5);

      await expect(controller.getStockLevel(mockStock.sku)).rejects.toThrowError('Error: Stock level is below 0');
    });
  });
});