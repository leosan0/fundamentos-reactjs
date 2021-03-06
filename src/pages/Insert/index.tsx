import React, { useCallback, useRef, useEffect, useState } from 'react';
import { FiUser, FiDollarSign, FiTag, FiCalendar } from 'react-icons/fi';

import { useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Radio from '../../components/Radio';
import Button from '../../components/Button';
import Select from '../../components/Select';
import DatePicker from '../../components/DatePicker';

import { Container, Content, AnimationContainer } from './styles';

import api from '../../services/api';

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

const Insert: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const [categories, setCategories] = useState<ICategory[]>([]);

  const radioOptions: IRadioOption[] = [
    { id: 'income', value: 'income', label: 'Entrada' },
    { id: 'outcome', value: 'outcome', label: 'Saída' },
  ];

  const handleSubmit = useCallback(
    async (data: IInsertFormData) => {
      try {
        // console.log(data);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          title: Yup.string().required('Nome obrigatório'),
          value: Yup.number().required('Valor obrigatório'),
          Icategory: Yup.string().ensure().required('Categoria obrigatória'),
          date: Yup.date(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/transactions', data);

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [history],
  );

  useEffect(() => {
    async function loadCategories(): Promise<void> {
      const response = await api.get('/categories');

      const categoriesOptions = response.data.map((category: ICategory) => {
        return {
          value: category.title,
          label: category.title,
        };
      });

      setCategories(categoriesOptions);
    }

    loadCategories();
  }, []);
  // const handleSubmit = useCallback(
  //   async (data: SignUpFormData) => {
  //     try {
  //       formRef.current?.setErrors({});

  //       const schema = Yup.object().shape({
  //         name: Yup.string().required('Nome obrigatório'),
  //         email: Yup.string()
  //           .required('E-mail obrigatório')
  //           .email('Digite um e-mail válido'),
  //         password: Yup.string().min(6, 'No mínimo 6 dígitos'),
  //       });

  //       await schema.validate(data, {
  //         abortEarly: false,
  //       });

  //       await api.post('/users', data);

  //       history.push('/');

  //       addToast({
  //         type: 'success',
  //         title: 'Cadastro realizado!',
  //         description: 'Você já pode fazer seu logon no GoBarber',
  //       });
  //     } catch (err) {
  //       if (err instanceof Yup.ValidationError) {
  //         const errors = getValidationErrors(err);

  //         formRef.current?.setErrors(errors);

  //         return;
  //       }

  //       addToast({
  //         type: 'error',
  //         title: 'Erro no cadastro',
  //         description: 'Ocorreu um erro ao fazer cadastro, tente novamente.',
  //       });
  //     }
  //   },
  //   [addToast, history],
  // );

  return (
    <>
      <Header size="small" />
      <Container>
        {/* <Background /> */}
        <Content>
          <AnimationContainer>
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

              <DatePicker
                name="date"
                icon={FiCalendar}
                placeholderText="Data"
              />

              <Radio name="type" options={radioOptions} />

              <Button type="submit">Inserir</Button>
            </Form>

            {/* <Link to="/">
              <FiArrowLeft />
              Voltar para logon
            </Link> */}
          </AnimationContainer>
        </Content>
      </Container>
    </>
  );
};

export default Insert;
