import fs from 'fs/promises';
import { StockData } from '../types';
import { IStockRepository } from './types';

export class StockRepository implements IStockRepository {
    private readonly filePath: string;
  
    constructor(filePath: string) {
      this.filePath = filePath;
    }
  
    async getStockBySku(sku: string): Promise<StockData> {
      const data = await fs.readFile(this.filePath, 'utf-8');
      const parsedStocks: StockData[] = JSON.parse(data);
      return parsedStocks
      .find((stock) => stock.sku === sku) as StockData;
    }
  }