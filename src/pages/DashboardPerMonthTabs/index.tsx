import React, { useState, useEffect } from 'react';

import { FiTrash } from 'react-icons/fi';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';
import ModalAddTransaction from '../../components/ModalAddTransaction';

import formatValue from '../../utils/formatValue';

import {
  Container,
  CardContainer,
  Card,
  TableFilter,
  TableContainer,
} from './styles';
import { monthsShort } from 'moment';
import { isTemplateTail } from 'typescript';

interface ITransaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
  date: Date;
}

interface ICreateTransactionFormData {
  title: string;
  value: number;
  type: string;
  category: string;
  date: Date;
}

interface IBalance {
  income: string;
  outcome: string;
  total: string;
}

interface ICategory {
  id: string;
  title: string;
}

interface IDate {
  year: string;
  month: string[];
}

interface IDate2 {
  [year: string]: string[];
}

interface IDate3 {
  year: string;
  month: string;
}

interface IDate4 {
  month: string[];
}

const DashboardPerMonthTabs: React.FC = () => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [balance, setBalance] = useState<IBalance>({} as IBalance);
  const [filteredBalance, setfilteredBalance] = useState<IBalance>(
    {} as IBalance,
  );

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [tabsYearsMonths, setTabsYearsMonths] = useState<IDate2[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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
      const response = await api.get('/transactions');

      // const transactionsFiltered = response.data.transactions.filter(
      //   (transaction: Transaction) =>
      //     new Date(transaction.created_at).getMonth() === Number(filterMonth) &&
      //     new Date(transaction.created_at).getFullYear() === Number(filterYear),
      // );
      const dates = response.data.transactions.map((transaction: ITransaction) => ({
        year: new Date(transaction.date).getFullYear(),
        month: new Date(transaction.date).toLocaleString('default', {
          month: 'long',
        }),
      }),
      );

      const datesYearMonths: IDate[] = [];

      dates.map((ar: IDate3) => {
        let index = -1;
        index = datesYearMonths.findIndex(date => date.year === ar.year);
        if (index >= 0) {
          if (dates[index].month.findIndex((m) => m === ar.month) < 0) {
            datesYearMonths[index].month.push(ar.month);
          }
        } else {
          datesYearMonths.push({
            year: ar.year,
            month: [
              ar.month
            ]
          });
        }
      });

      console.log(datesYearMonths);


      const transactionsFormatted = response.data.transactions.map(
        (transaction: ITransaction) => ({
          ...transaction,
          formattedValue: formatValue(transaction.value),
          formattedDate: new Date(transaction.date).toLocaleDateString('pt-br'),
        }),
      );

      const balanceFormatted = {
        income: formatValue(response.data.balance.income),
        outcome: formatValue(response.data.balance.outcome),
        total: formatValue(response.data.balance.total),
      };

      console.log(balanceFormatted)

      setTransactions(transactionsFormatted);
      setBalance(balanceFormatted);
      // setTabsYearsMonths(filteredDates);
    }

    loadTransactions();

    async function loadCategories(): Promise<void> {
      const response = await api.get('/categories');
      setCategories(response.data);
    }

    loadCategories();
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

  async function handleAddTransaction(
    transaction: ICreateTransactionFormData,
  ): Promise<void> {
    console.log(transaction);
    try {
      const response = await api.post('/transactions', transaction);

      const newTransaction = response.data;

      const transactionFormatted = {
        ...newTransaction,
        formattedValue: formatValue(newTransaction.value),
        formattedDate: new Date(newTransaction.date).toLocaleDateString(
          'pt-br',
        ),
      };

      setTransactions([...transactions, transactionFormatted]);
    } catch (err) {
      console.log(err);
    }
  }

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddTransaction
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddTransaction={handleAddTransaction}
        categories={categories}
      />
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

        <Tabs forceRenderTabPanel defaultIndex={1}>
          <TabList>
            {

            }
          </TabList>
          <TabPanel>
            <Tabs forceRenderTabPanel>
              <TabList>
                {tabsYearsMonths
                  .map(year =>
                    <Tab>{year}</Tab>
                  )}
              </TabList>
            </Tabs>
          </TabPanel>
        </Tabs>

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
      </Container >
    </>
  );
};

export default DashboardPerMonthTabs;
