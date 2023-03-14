import fs from 'fs/promises';
import { StockData } from '../types';
import { IStockRepository } from './types';

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