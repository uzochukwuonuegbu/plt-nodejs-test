import { StockData, Transaction } from "../types";

export interface IStockService {
  getStockBySku(sku: string): Promise<StockData>;
}

export interface ITransactionService {
  getTransactionsBySku(sku: string): Promise<Transaction[]>;
  getTransactionQtyBySku(sku: string, stockCreatedAt: Date): Promise<number>;
}