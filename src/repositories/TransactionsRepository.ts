import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const allTransactions = this.transactions;

    const allIncomes = allTransactions
      .filter(transaction => transaction.type === 'income')
      .reduce((previousValue, currentValue) => {
        return previousValue + currentValue.value;
      }, 0);

    const allOutcomes = allTransactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((previousValue, currentValue) => {
        return previousValue + currentValue.value;
      }, 0);

    const balance = {
      income: allIncomes,
      outcome: allOutcomes,
      total: allIncomes - allOutcomes,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
