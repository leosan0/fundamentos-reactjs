import React, { useRef, useCallback, useState, useEffect } from 'react';

import {
  FiUser,
  FiDollarSign,
  FiTag,
  FiCalendar,
  FiCheckSquare,
} from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Form } from './styles';

import getValidationErrors from '../../utils/getValidationErrors';

import Modal from '../Modal';
import Input from '../Input';
import Radio from '../Radio';
import Button from '../Button';
import Select from '../Select';
import DatePicker from '../DatePicker';

interface ICategory {
  id: string;
  title: string;
}

interface ICreateTransactionFormData {
  title: string;
  value: number;
  type: string;
  category: string;
  date: Date;
}

interface IRadioOption {
  id: string;
  value: string;
  label: string;
}

interface ISelectOption {
  value: string;
  label: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddTransaction: (transaction: ICreateTransactionFormData) => void;
  categories: ICategory[];
}

const ModalAddTransaction: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddTransaction,
  categories,
}) => {
  const formRef = useRef<FormHandles>(null);

  const radioOptions: IRadioOption[] = [
    { id: 'income', value: 'income', label: 'Entrada' },
    { id: 'outcome', value: 'outcome', label: 'Saída' },
  ];

  const categoriesOptions = categories.map((category: ICategory) => {
    return {
      value: category.title,
      label: category.title,
    };
  });

  const handleSubmit = useCallback(
    async (data: ICreateTransactionFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          title: Yup.string().required('Nome obrigatório'),
          value: Yup.number().required('Valor obrigatório'),
          category: Yup.string().ensure().required('Categoria obrigatória'),
          date: Yup.date(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        handleAddTransaction(data);

        setIsOpen();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [handleAddTransaction, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
        initialData={{ type: 'income' }}
      >
        <h1>Cadastre sua transação</h1>

        <Input name="title" icon={FiUser} placeholder="Título" />
        <Input name="value" icon={FiDollarSign} placeholder="Preço" />
        <Select
          name="category"
          icon={FiTag}
          placeholder="Categoria"
          options={categoriesOptions}
        />

        <DatePicker name="date" icon={FiCalendar} placeholderText="Data" />

        <Radio name="type" options={radioOptions} />

        <Button type="submit">Inserir</Button>
      </Form>
      {/*
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
       */}
    </Modal>
  );
};

export default ModalAddTransaction;
