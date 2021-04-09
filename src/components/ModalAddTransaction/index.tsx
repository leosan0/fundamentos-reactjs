import React, { useRef, useCallback, useState } from 'react';

import {
  FiUser,
  FiDollarSign,
  FiTag,
  FiCalendar,
  FiCheckSquare,
} from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
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

interface IInsertFormData {
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
  handleAddTransaction: (food: IInsertFormData) => void;
}

const ModalAddTransaction: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddTransaction,
}) => {
  const formRef = useRef<FormHandles>(null);
  const [categories, setCategories] = useState<ICategory[]>([]);

  const radioOptions: IRadioOption[] = [
    { id: 'income', value: 'income', label: 'Entrada' },
    { id: 'outcome', value: 'outcome', label: 'Saída' },
  ];

  const handleSubmit = useCallback(
    async (data: IInsertFormData) => {
      handleAddTransaction(data);

      setIsOpen();
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
          options={categories}
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
