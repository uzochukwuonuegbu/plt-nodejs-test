import path from 'path';
import { StockRepository } from "./src/repositories/stock.repository";
import { TransactionRepository } from "./src/repositories/transaction.repository";
import { StockService } from "./src/services/stock.service";
import { TransactionService } from "./src/services/transaction.service";
import { InventoryController } from './src/controllers/inventory.controller';

const stockRepository = new StockRepository(path.resolve('stock.json'));
const transactionRepository = new TransactionRepository(path.resolve('transactions.json'));

const stockService = new StockService(stockRepository);
const transactionService = new TransactionService(transactionRepository);

const stockCtrl = new InventoryController(stockService, transactionService);

const sku = 'SKU003';
stockCtrl.getStockLevel(sku).then((data) => console.log({data})).catch(err => console.log(err));
