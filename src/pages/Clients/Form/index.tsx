/* eslint-disable @typescript-eslint/camelcase */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory, useParams } from 'react-router-dom';

import Menu from '../../../components/Menu';
import InputField from '../../../components/Input';
import { useToast } from '../../../hooks/Toast';
import { Container, Content, Header } from '../../../styles/global';

import getValidationErrors from '../../../utils/getVaalidationErrors';
import api from '../../../services/api';
import FormButtons from '../../../components/FormButtons';

interface ClientFormData {
  name: string;
  address: string;
}

interface ParamsData {
  id: string;
}

const ClientForm: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const { id } = useParams<ParamsData>();

  useEffect(() => {
    async function loadProduct(): Promise<void> {
      const response = await api.get(`/clients`, {
        params: {
          id,
        },
      });
      const client = response.data.rows[0];
      formRef.current?.setData(client);
    }
    if (id) {
      loadProduct();
    }
  }, [id]);

  const handleSubmit = useCallback(
    async (data: ClientFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          address: Yup.string().required('Endereço obrigatório'),
        });

        await schema.validate(data, { abortEarly: false });

        let msg;
        if (id) {
          await api.put(`/products/${id}`, data);
          msg = 'O cliente foi atualizado com sucesso.';
        } else {
          await api.post('/products', data);
          msg = 'O cliente foi criado com sucesso.';
        }

        history.push('/clients');
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
          <h1>{id ? 'Alterar Cliente' : 'Novo Cliente'}</h1>
        </Header>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <InputField name="name" placeholder="Informe o nome do cliente" />
          <InputField
            name="address"
            placeholder="Informe o endereço do cliente"
          />
          <FormButtons />
        </Form>
      </Content>
    </Container>
  );
};

export default ClientForm;
