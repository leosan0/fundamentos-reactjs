import React, { useState, useEffect, useCallback } from 'react';

import { FiTrash } from 'react-icons/fi';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';

import {
  Container,
  CardContainer,
  Card,
  TableFilter,
  TableContainer,
} from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface Balance {
  income: string;
  outcome: string;
  total: string;
}

const colourOptions = [
  { value: 'outcome', label: 'Ocean', color: '#00B8D9', isFixed: true },
  { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
  { value: 'purple', label: 'Purple', color: '#5243AA' },
  { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
  { value: 'orange', label: 'Orange', color: '#FF8B00' },
  { value: 'yellow', label: 'Yellow', color: '#FFC400' },
  { value: 'green', label: 'Green', color: '#36B37E' },
  { value: 'forest', label: 'Forest', color: '#00875A' },
  { value: 'slate', label: 'Slate', color: '#253858' },
  { value: 'silver', label: 'Silver', color: '#666666' },
];

const DashboardPerMonth: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  const [searchValue, setSearchValue] = useState('');

  const handleSortColumn = () => {
    const sorted = [...transactions].sort((a, b) => {
      // return +(a.title > b.title) || +(a.title === b.title) - 1;
      if (a.category.title > b.category.title) {
        return 1;
      }
      if (a.category.title < b.category.title) {
        return -1;
      }
      return 0;
    });

    setTransactions(sorted);

    console.log(sorted);
  };

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const response = await api.get(`/transactions`);

      const transactionsFormatted = response.data.transactions.map(
        (transaction: Transaction) => ({
          ...transaction,
          formattedValue: formatValue(transaction.value),
          formattedDate: new Date(transaction.created_at).toLocaleDateString(
            'pt-br',
          ),
        }),
      );

      const balanceFormatted = {
        income: formatValue(response.data.balance.income),
        outcome: formatValue(response.data.balance.outcome),
        total: formatValue(response.data.balance.total),
      };

      setTransactions(transactionsFormatted);
      setBalance(balanceFormatted);
    }

    loadTransactions();
  }, []);

  async function handleDelete(id: string): Promise<void> {
    try {
      await api.delete(`/transactions/${id}`);

      const transactionsFiltered = transactions.filter(
        transaction => transaction.id !== id,
      );
      setTransactions(transactionsFiltered);

      const { income, outcome } = transactionsFiltered.reduce(
        (accumulator, transaction) => {
          switch (transaction.type) {
            case 'income':
              accumulator.income += Number(transaction.value);
              break;

            case 'outcome':
              accumulator.outcome += Number(transaction.value);
              break;

            default:
              break;
          }

          return accumulator;
        },
        {
          income: 0,
          outcome: 0,
          total: 0,
        },
      );

      const total = income - outcome;

      const balanceFormatted = {
        income: formatValue(income),
        outcome: formatValue(outcome),
        total: formatValue(total),
      };

      setBalance(balanceFormatted);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">{balance.income}</h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">{balance.outcome}</h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">{balance.total}</h1>
          </Card>
        </CardContainer>

        <TableFilter>
          <label htmlFor="month">Escolha um mês:</label>

          <select
            name="month"
            id="month"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
          >
            <option value="09">Setembro</option>
            <option value="outcome">Outubro</option>
            <option value="11">Novembro</option>
            <option value="12">Dezembro</option>
          </select>
        </TableFilter>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th onClick={handleSortColumn}>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Data</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td className="title">{transaction.title}</td>
                  <td className={transaction.type}>
                    {transaction.type === 'outcome' && ' - '}
                    {transaction.formattedValue}
                  </td>
                  <td>{transaction.category.title}</td>
                  <td>{transaction.formattedDate}</td>
                  <td>
                    <button
                      type="button"
                      className="icon"
                      onClick={() => handleDelete(transaction.id)}
                    >
                      <FiTrash size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default DashboardPerMonth;
