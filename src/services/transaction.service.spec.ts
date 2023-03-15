import { Transaction, TransactionType } from '../types';
import { TransactionService } from './transaction.service';

describe('TransactionService', () => {
    const mockTransactions: Transaction[] = [
        {
            sku: 'SKU001',
            qty: 10,
            type: TransactionType.INCREASE,
            timestamp: '2022-02-01T03:15:00Z',
        },
        {
            sku: 'SKU001',
            qty: 5,
            type: TransactionType.DECREASE,
            timestamp: '2022-02-02T09:15:00Z',
        },
        {
            sku: 'SKU002',
            qty: 2,
            type: TransactionType.INCREASE,
            timestamp: '2022-02-03T09:15:00Z',
        },
    ];

    const mockRepository = {
        getTransactionsBySku: jest.fn().mockImplementation((sku) => {
            return Promise.resolve(mockTransactions.filter((tx) => tx.sku === sku));
        }),
    };

    const service = new TransactionService(mockRepository as any);

    describe('getTransactionsBySku', () => {
        it('should return transactions filtered by sku', async () => {
            const result = await service.getTransactionsBySku('SKU001');
            expect(result).toEqual([
                {
                    sku: 'SKU001',
                    qty: 10,
                    type: TransactionType.INCREASE,
                    timestamp: '2022-02-01T03:15:00Z',
                },
                {
                    sku: 'SKU001',
                    qty: 5,
                    type: TransactionType.DECREASE,
                    timestamp: '2022-02-02T09:15:00Z',
                },
            ]);
        });
    });

    describe('getTransactionsSinceStockUpdate', () => {
        it('should return transactions filtered by sku and since stock update date', async () => {
            const result = await service.getTransactionsSinceStockUpdate(
                'SKU001',
                '2022-02-02T01:15:00Z',
            );
            expect(result).toEqual([
                {
                    sku: 'SKU001',
                    qty: 5,
                    type: TransactionType.DECREASE,
                    timestamp: '2022-02-02T09:15:00Z',
                },
            ]);
        });
    });

    describe('getTransactionsQtySinceStockUpdate', () => {
        it('should return quantity of transactions filtered by sku and since stock update date', async () => {
            const result = await service.getTransactionsQtySinceStockUpdate(
                'SKU001',
                10,
                '2022-02-02T01:15:00Z',
            );
            expect(result).toEqual(5);
        });
    });

    describe('getTransactionQtyBySku', () => {
        it('should return quantity of transactions filtered by sku', async () => {
            const result = await service.getTransactionQtyBySku('SKU001', 10);
            expect(result).toEqual(15);
        });

        it('should throw an error if no transactions found for sku', async () => {
            await expect(service.getTransactionQtyBySku('SKU003', 0)).rejects.toThrow(
                'No transactions found for SKU: SKU003',
            );
        });
    });

    describe('txQtyReducer', () => {
        const transactions = [
          { type: TransactionType.INCREASE, qty: 10 },
          { type: TransactionType.DECREASE, qty: 5 },
          { type: TransactionType.UNKNOWN, qty: 0 },
        ] as Transaction[];

        it('should return the initial stockQty when no transactions are passed', () => {
          expect(service.txQtyReducer([], 100)).toBe(100);
        });

        it('should calculate the total quantity of transactions when transactions are passed', () => {
          expect(service.txQtyReducer(transactions)).toBe(5);
        });

        it('should correctly add and subtract transactions from the initial stockQty', () => {
          expect(service.txQtyReducer(transactions, 20)).toBe(25);
        });
      });
});
