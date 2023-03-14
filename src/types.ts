export interface StockItem {
    sku: string;
    qty: number;
  }
  
export interface Transaction {
  sku: string;
  qty: number;
  timestamp: Date;
}

export interface IStockService {
  getStock(sku: string): Promise<{ sku: string, qty: number }>;
}