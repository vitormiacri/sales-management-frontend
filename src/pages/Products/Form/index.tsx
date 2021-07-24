/* eslint-disable @typescript-eslint/camelcase */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory, useParams } from 'react-router-dom';

import Menu from '../../../components/Menu';
import InputField from '../../../components/Input';
import { useToast } from '../../../hooks/Toast';
import { Container, Content, FormRow, Header } from '../../../styles/global';

import getValidationErrors from '../../../utils/getValidationErrors';
import api from '../../../services/api';
import FormButtons from '../../../components/FormButtons';
import { moedaMask } from '../../../utils/masks';
import Format from '../../../utils/format';

interface ProductFormData {
  name: string;
  price: string;
  cost: string;
  quantity: number;
  stock_amount: number;
}

interface ParamsData {
  id: string;
}

const ProductForm: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const { id } = useParams<ParamsData>();
  const [stock, setStock] = useState<number>(0);

  useEffect(() => {
    async function loadProduct(): Promise<void> {
      const response = await api.get(`/products`, {
        params: {
          id,
        },
      });
      const product = response.data.rows[0];

      formRef.current?.setData({
        ...product,
        price: `R$ ${Format.dbToCurrency(product.price)}`,
        cost: `R$ ${Format.dbToCurrency(product.cost)}`,
      });
      setStock(product.stock_amount);
    }
    if (id) {
      loadProduct();
    }
  }, [id]);

  const handleSubmit = useCallback(
    async (data: ProductFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          stock_amount: Yup.number().required(
            'Quantidade produzida é obrigatória',
          ),
          price: Yup.string().required('Valor de venda é obrigatório'),
          cost: Yup.string().required('Valor de custo é obrigatório'),
        });

        await schema.validate(data, { abortEarly: false });

        const formattedData = {
          ...data,
          cost: Format.currencyToDB(data.cost),
          price: Format.currencyToDB(data.price),
        };
        let msg;
        if (id) {
          await api.put(`/products/${id}`, formattedData);
          msg = 'O produto foi atualizado com sucesso.';
        } else {
          await api.post('/products', formattedData);
          msg = 'O produto foi criado com sucesso.';
        }

        history.push('/products');
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

  const handleChangeMoney = useCallback(e => {
    const value = moedaMask(e.target.value);
    e.target.value = `R$ ${value}`;
  }, []);

  const handleBlurQuantity = useCallback(
    e => {
      const quantity = +e.target.value;
      const newStock = stock + quantity;
      formRef.current?.setFieldValue('stock_amount', newStock);
    },
    [stock],
  );

  return (
    <Container>
      <Menu />
      <Content>
        <Header>
          <h1>Novo Produto</h1>
        </Header>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <InputField name="name" placeholder="Informe o nome do produto" />

          <FormRow>
            <InputField
              name="quantity"
              type="number"
              placeholder="Informe a quantidade produzida"
              onBlur={e => handleBlurQuantity(e)}
            />
            <InputField
              name="stock_amount"
              type="number"
              readOnly
              disabled
              placeholder="Quantidade total (estoque)"
            />
          </FormRow>
          <FormRow>
            <InputField
              name="cost"
              type="text"
              placeholder="Informe o valor de custo"
              onChange={handleChangeMoney}
            />
            <InputField
              name="price"
              type="text"
              placeholder="Informe o valor de venda"
              onChange={handleChangeMoney}
            />
          </FormRow>

          <FormButtons />
        </Form>
      </Content>
    </Container>
  );
};

export default ProductForm;
