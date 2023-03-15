### PLT Senior NodeJS Developer Test

This is a Node.js application that implements an inventory management system. It allows the user to view stock levels of a product using its SKU.

## Installation
To install the necessary packages, run the following command in the project directory:

    - npm install

## Usage
The main entry point of the application is main.ts. It imports several modules, including:

    - StockRepository: A module that provides an interface for reading and writing stock information to a JSON file.
    - TransactionRepository: A module that provides an interface for reading and writing transaction information to a JSON file.
    - StockService: A module that provides business logic for managing stock.
    - TransactionService: A module that provides business logic for managing transactions.
    - InventoryController: A module that provides an interface for interacting with the inventory management system.


To use the application, run the following command in the terminal:

    - npx ts-node main.ts

## Testing
To run the tests for this application, run the following command in the project directory:

    - npm test

This command will run the test suite defined in the test directory, using the Jest testing framework. The test suite includes unit tests for the StockRepository, TransactionRepository, StockService, TransactionService, and InventoryController modules.