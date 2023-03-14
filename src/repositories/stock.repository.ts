import fs from 'fs/promises';
import { IStockRepository, StockData } from './types';

export class StockRepository implements IStockRepository {
    private readonly filePath: string;
  
    constructor(filePath: string) {
      this.filePath = filePath;
    }
  
    async getStock(): Promise<StockData> {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    }
  }