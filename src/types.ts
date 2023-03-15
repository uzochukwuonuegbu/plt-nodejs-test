export interface StockData {
    sku: string;
    qty: number;
    updatedAt: Date;
}

export interface Transaction {
    sku: string;
    qty: number;
    timestamp: Date;
}