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

  public getBalance({ value, type }:CreateTransactionDTO): Balance {
    let income = 0;
    let outcome = 0;

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < this.transactions.length; i++) {
      if (type === 'income') {
        income += value;
      } else if (type === 'outcome') {
        outcome += value;
      }
    }

    const balance = income - outcome;

    return { income, outcome, balance };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
