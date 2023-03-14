import { TransactionRepository } from "../repositories/transaction.repository";
import { Transaction } from "../types";
import { ITransactionService } from "./types";

export class TransactionService implements ITransactionService {
    private readonly repository: TransactionRepository;
  
    constructor(repository: TransactionRepository) {
      this.repository = repository;
    }
  
    async getTransactionsBySku(sku: string): Promise<Transaction[]> {
        const transactions = await this.repository.getTransactions();
        return transactions
            .filter((transaction) => transaction.sku === sku);
    }

    async getTransactionQtyBySku(sku: string): Promise<number> {
        const transactionsBySku = await this.getTransactionsBySku(sku);
        return transactionsBySku.map((transaction) => transaction.qty)
            .reduce((acc, curr) => acc + curr, 0);
    }
  }
  