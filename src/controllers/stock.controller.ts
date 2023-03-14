import { StockService } from '../services/stock.service';
import { TransactionService } from '../services/transaction.service';

export class StockController {
    constructor(
        private readonly stockService: StockService,
        private readonly transactionService: TransactionService,
    ) {}

    async getStockLevel(sku: string) {
        // throw error if sku is not found in tx or stock
        const { qty: stockLevel } = await this.stockService.getStock(sku);
        const skuTxQty = await this.transactionService.getTransactionQtyBySku(sku);

        const currentStock = stockLevel - skuTxQty;

        if (currentStock < 0) {
            throw 'Stock level can not be Negative'
        }

        return { sku, qty: currentStock };
    }
}