import { StockService } from '../services/stock.service';
import { TransactionService } from '../services/transaction.service';

export class InventoryController {
    constructor(
        private readonly stockService: StockService,
        private readonly transactionService: TransactionService,
    ) {}

    async getStockLevel(sku: string) {
        try {
          const stock = await this.stockService.getStockBySku(sku);
          const { qty = 0, updatedAt } = stock ?? {};
          const currentStock = stock
            ? await this.transactionService.getTransactionsQtySinceStockUpdate(sku, qty, updatedAt)
            : await this.transactionService.getTransactionQtyBySku(sku, qty);
      
          if (currentStock < 0) {
            throw new Error(`Stock level is below 0, stock level: ${currentStock}`);
          }
      
          return { sku, qty: currentStock };
        } catch (error: any) {
          throw new Error(error);
        }
    }
}