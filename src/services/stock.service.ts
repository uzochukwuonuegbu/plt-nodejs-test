import { StockRepository } from '../repositories/stock.repository';
import { StockData } from '../types';
import { IStockService } from './types';

export class StockService implements IStockService {
    private readonly repository: StockRepository;
  
    constructor(repository: StockRepository) {
      this.repository = repository;
    }
  
    async getStockBySku(sku: string): Promise<StockData> {
      const stock = await this.repository.getStockBySku(sku);
      return stock;
    }
}