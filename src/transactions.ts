import fs from 'fs/promises';
import { Transaction } from '../types';

export class Transactions {
  private transactions: Transaction[];

  constructor(private readonly transactionsFilePath: string) {}

  async init(): Promise<void> {
    const data = await fs.readFile(this.transactionsFilePath, 'utf-8');
    this.transactions = JSON.parse(data);
  }

  getTransactionQtyBySku(sku: string): number {
    return this.transactions
      .filter((transaction) => transaction.sku === sku)
      .reduce((acc, transaction) => acc + transaction.qty, 0);
  }
}