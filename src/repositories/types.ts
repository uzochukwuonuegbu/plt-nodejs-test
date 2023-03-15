import { StockData, Transaction } from "../types";

export interface IStockRepository {
    getStockBySku(sku: string): Promise<StockData>;
}


export interface ITransactionRepository {
    getTransactions(): Promise<Transaction[]>;
}  