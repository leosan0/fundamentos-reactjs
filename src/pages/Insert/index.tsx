import React, { useRef } from 'react';
import {
  FiArrowLeft,
  FiMail,
  FiUser,
  FiLock,
  FiDollarSign,
  FiTag,
  FiCalendar,
} from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer } from './styles';

interface InsertFormData {
  name: string;
  email: string;
  password: string;
}

const Insert: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

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
      <Header />
      <Container>
        {/* <Background /> */}
        <Content>
          <AnimationContainer>
            <Form ref={formRef} onSubmit={() => console.log('submit')}>
              <h1>Faça seu cadastro</h1>

              <Input name="title" icon={FiUser} placeholder="Título" />
              <Input name="price" icon={FiDollarSign} placeholder="Preço" />
              <Input name="category" icon={FiTag} placeholder="Categoria" />
              <Input name="date" icon={FiCalendar} placeholder="Data" />

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
