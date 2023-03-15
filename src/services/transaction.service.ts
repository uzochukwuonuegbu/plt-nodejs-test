import moment from 'moment';
import { TransactionRepository } from "../repositories/transaction.repository";
import { Transaction } from "../types";
import { ITransactionService } from "./types";

export class TransactionService implements ITransactionService {
    private readonly repository: TransactionRepository;
  
    constructor(repository: TransactionRepository) {
      this.repository = repository;
    }
  
    async getTransactionsBySku(sku: string): Promise<Transaction[]> {
        return this.repository.getTransactionsBySku(sku);
    }

    async getTransactionQtyBySku(sku: string, stockCreatedAt: Date): Promise<number> {
        const transactionsBySku = await this.getTransactionsBySku(sku);
        const stockUnixTimestamp = moment(stockCreatedAt).unix();
        return transactionsBySku
            // we are checking to make sure we only filter txs that occured since the stock was recorded in stock.json 
            .filter((tx) => moment(tx.timestamp).unix() > stockUnixTimestamp)
            .map((transaction) => transaction.qty)
            .reduce((acc, curr) => acc + curr, 0);
    }
  }
  