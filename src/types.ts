export interface StockData {
    sku: string;
    qty: number;
    updatedAt: string;
}

export enum TransactionType {
    INCREASE = 'increased',
    DECREASE = 'decreased',
    UNKNOWN = 'unknown'
}
export interface Transaction {
    sku: string;
    qty: number;
    type: TransactionType
    timestamp: string;
}