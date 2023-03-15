import moment from 'moment';
import { TransactionRepository } from "../repositories/transaction.repository";
import { Transaction, TransactionType } from "../types";
import { ITransactionService } from "./types";

export class TransactionService implements ITransactionService {
    private readonly repository: TransactionRepository;
  
    constructor(repository: TransactionRepository) {
      this.repository = repository;
    }
  
    public async getTransactionsBySku(sku: string): Promise<Transaction[]> {
        return this.repository.getTransactionsBySku(sku);
    }

    private txQtyReducer(transactions: Transaction[], stockQty: number = 0,): number {
        return transactions.reduce((quantity, transaction) => {
            if (transaction.type === TransactionType.INCREASE) {
                return quantity + transaction.qty;
            } else if (transaction.type === TransactionType.DECREASE) {
                return quantity - transaction.qty;
            } else {
                return quantity;
            }
        }, stockQty);
    }

    public async getTransactionsSinceStockUpdate(sku: string, stockUpdatedAt: Date): Promise<Transaction[]> {
        const transactionsBySku = await this.getTransactionsBySku(sku);
        const stockUnixTimestamp = moment(stockUpdatedAt).unix();
        return transactionsBySku
            // we want to make sure we only filter txs that occured since the stock was recorded in stock.json 
            .filter((tx) => moment(tx.timestamp).unix() > stockUnixTimestamp)
    }

    public async getTransactionsQtySinceStockUpdate(sku: string, qty: number, stockUpdatedAt: Date): Promise<number> {
        const transactionsBySku = await this.getTransactionsSinceStockUpdate(sku, stockUpdatedAt);
        return this.txQtyReducer(transactionsBySku, qty);
    }

    public async getTransactionQtyBySku(sku: string, qty: number): Promise<number> {
        const transactionsBySku = await this.getTransactionsBySku(sku);
        if (!transactionsBySku.length) throw new Error(`No transactions found for SKU: ${sku}`)
        return this.txQtyReducer(transactionsBySku, qty)
    }
  }
  