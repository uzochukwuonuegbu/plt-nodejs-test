import fs from 'fs/promises';

interface StockData {
  [sku: string]: number;
}

export class StockRepository {
  private readonly filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  async getStock(): Promise<StockData> {
    const data = await fs.readFile(this.filePath, 'utf-8');
    return JSON.parse(data);
  }
}