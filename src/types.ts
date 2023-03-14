export interface StockData {
    [sku: string]: number;
}

export interface Transaction {
    sku: string;
    qty: number;
    timestamp: Date;
}