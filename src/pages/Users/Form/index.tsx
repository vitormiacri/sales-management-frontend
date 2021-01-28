import React, { useCallback, useRef } from 'react';
import { MdEmail, MdLock, MdPerson } from 'react-icons/md';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory, useParams } from 'react-router-dom';

import Menu from '../../../components/Menu';
import InputField from '../../../components/Input';

import { useToast } from '../../../hooks/Toast';
import { Container, Content, Header } from '../../../styles/global';
import getValidationErrors from '../../../utils/getValidationErrors';
import api from '../../../services/api';
import FormButtons from '../../../components/FormButtons';

interface UserFormData {
  name: string;
  email: string;
  password: string;
}

interface ParamsData {
  id: string;
}

const UserForm: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const { id } = useParams<ParamsData>();

  const handleSubmit = useCallback(
    async (data: UserFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .email('E-mail inválido')
            .required('E-mail obrigatório'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, { abortEarly: false });

        let msg;
        if (id) {
          await api.put(`/users/${id}`, data);
          msg = 'O usuário foi atualizado com sucesso.';
        } else {
          await api.post('/users', data);
          msg = 'O usuário foi criado com sucesso.';
        }

        history.push('/users');
        addToast({
          type: 'success',
          title: 'Sucesso!',
          description: msg,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }
        addToast({
          type: 'error',
          title: 'Erro ao salvar',
          description: 'Ocorreu um erro, tente novamente',
        });
      }
    },
    [addToast, history, id],
  );

  return (
    <Container>
      <Menu />
      <Content>
        <Header>
          <h1>Novo Usuário</h1>
        </Header>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <InputField
            name="name"
            icon={MdPerson}
            placeholder="Informe seu nome"
          />

          <InputField
            name="email"
            icon={MdEmail}
            type="email"
            placeholder="Informe seu e-mail"
          />

          <InputField
            name="password"
            type="password"
            icon={MdLock}
            placeholder="Informe uma senha"
          />
          <FormButtons />
        </Form>
      </Content>
    </Container>
  );
};

export default UserForm;
