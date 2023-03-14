import fs from 'fs/promises';
import { Transaction } from '../types';
import { ITransactionRepository } from './types';

export class TransactionRepository implements ITransactionRepository {
    private readonly filePath: string;
  
    constructor(filePath: string) {
      this.filePath = filePath;
    }
  
    async getTransactions(): Promise<Transaction[]> {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    }
  }