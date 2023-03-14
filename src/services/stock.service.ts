import { StockRepository } from '../repositories/stock.repository';
import { IStockService } from './types';

export class StockService implements IStockService {
    private readonly repository: StockRepository;
  
    constructor(repository: StockRepository) {
      this.repository = repository;
    }
  
    async getStock(sku: string): Promise<{ sku: string, qty: number }> {
      const stock = await this.repository.getStock();
      const qty = stock[sku] || 0;
      return { sku, qty };
    }
}