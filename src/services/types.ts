import { Transaction } from "../types";

export interface IStockService {
  getStock(sku: string): Promise<{ sku: string, qty: number }>;
}

export interface ITransactionService {
  getTransactionsBySku(sku: string): Promise<Transaction[]>;
  getTransactionQtyBySku(sku: string): Promise<number>;
}