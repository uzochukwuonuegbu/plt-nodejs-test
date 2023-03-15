import { StockService } from '../services/stock.service';
import { TransactionService } from '../services/transaction.service';

export class StockController {
    constructor(
        private readonly stockService: StockService,
        private readonly transactionService: TransactionService,
    ) {}

    async getStockLevel(sku: string) {
        // throw error if sku is not found in tx or stock
        const { qty: stockLevel, updatedAt } = await this.stockService.getStockBySku(sku);
        const skuTxQty = await this.transactionService.getTransactionQtyBySku(sku, updatedAt);

        const currentStock = stockLevel - skuTxQty;

        if (currentStock < 0) {
            throw new Error(`Stock level can not be Negative, stock level: ${currentStock}`)
        }

        return { sku, qty: currentStock };
    }
}