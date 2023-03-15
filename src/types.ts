export interface StockData {
    sku: string;
    qty: number;
    updatedAt: Date;
}

export enum TransactionType {
    INCREASE = 'increased',
    DECREASE = 'decreased'
}
export interface Transaction {
    sku: string;
    qty: number;
    type: TransactionType
    timestamp: Date;
}