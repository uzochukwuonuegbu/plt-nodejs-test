export interface IStockRepository {
    getStock(): Promise<{ [sku: string]: number }>;
}


export interface ITransactionRepository {
    getTransactions(): Promise<{ sku: string, qty: number, timestamp: Date }[]>;
}  