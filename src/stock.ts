import fs from 'fs';
import { StockItem } from '../types';

export class Stock {
  private stockItems: StockItem[];

  constructor(private readonly stockFilePath: string) {}

  async init(): Promise<void> {
    const data = fs.readFileSync(this.stockFilePath, 'utf-8');
    this.stockItems = JSON.parse(data);
  }

  getStockItem(sku: string): StockItem {
    const stockItem = this.stockItems.find((item) => item.sku === sku);
    if (!stockItem) {
      throw new Error(`SKU '${sku}' not found in stock.`);
    }
    return stockItem;
  }
}