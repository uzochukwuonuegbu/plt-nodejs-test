import { Stock } from './stock';
import { Transactions } from './transactions';
import { StockItem } from './types';

export class StockController {
  constructor(
    private readonly stock: Stock,
    private readonly transactions: Transactions
  ) {}

  async getCurrentStockLevel(sku: string): Promise<StockItem> {
    await this.stock.init();
    await this.transactions.init();
  
    const stockItem = this.stock.getStockItemBySku(sku);
    const transactionQty = this.transactions.getTransactionQtyBySku(sku);
    const currentStockLevel = stockItem.qty - transactionQty;
  
    if (currentStockLevel < 0) {
      throw new Error(`Negative stock level for SKU '${sku}'`);
    }
  
    return { sku, qty: currentStockLevel };
  }
}