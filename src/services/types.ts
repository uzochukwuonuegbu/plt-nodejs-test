import { StockData, Transaction } from "../types";

export interface IStockService {
  getStockBySku(sku: string): Promise<StockData>;
}

export interface ITransactionService {
  getTransactionsBySku(sku: string, qty: number): Promise<Transaction[]>;
  getTransactionQtyBySku(sku: string, qty: number, stockCreatedAt: Date): Promise<number>;
}