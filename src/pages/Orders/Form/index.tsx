/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable @typescript-eslint/camelcase */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import { MdAdd, MdRemove, MdDeleteForever } from 'react-icons/md';
import {
  Menu,
  InputField,
  FormButtons,
  Select,
  Table,
  Card,
} from '../../../components';

import { useToast } from '../../../hooks/Toast';
import {
  AddButton,
  Container,
  Content,
  FormRow,
  Header,
} from '../../../styles/global';
import { QuantityColumn, TotalOrder } from '../styles';

import getValidationErrors from '../../../utils/getValidationErrors';
import api from '../../../services/api';

import { moedaMask } from '../../../utils/masks';
import Format from '../../../utils/format';

interface OrderFormData {
  client: string;
  total_value: string;
  payment_method: string;
  products: { id: number; quantity: number; price: number }[];
}

interface ProductData {
  id: number;
  name: string;
  price: number;
  formattedPrice: string;
}

interface ProductListData extends ProductData {
  quantity: number;
  totalValue: string;
}

interface ClientsData {
  id: number;
  name: string;
  address: string;
}

export interface SelectOptions {
  value: number | string;
  label: string;
}

const paymentMethodOptions = [
  { value: 'credito', label: 'Crédito' },
  { value: 'debito', label: 'Débito' },
  { value: 'dinheiro', label: 'Dinheiro' },
];

const OrderForm: React.FC = () => {
  const tableHeader = ['Produto', 'Quantidade', 'Valor Un.', 'Valor Total'];
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const [products, setProducts] = useState<SelectOptions[]>([]);
  const [productsList, setProductsList] = useState<ProductListData[]>([]);
  const [clients, setClients] = useState<SelectOptions[]>([]);
  const [selectProduct, setSelectProduct] = useState<ProductData>({
    id: 0,
    name: '',
    price: 0,
    formattedPrice: '0',
  });
  const [totalOrder, setTotalOrder] = useState<string>('');

  const loadClients = useCallback(async () => {
    const response = await api.get('/clients');
    setClients(
      response.data.rows.map((client: ClientsData) => ({
        value: client.id,
        label: `${client.name}`,
      })),
    );
  }, []);

  const loadProducts = useCallback(async () => {
    const response = await api.get('/products');
    setProducts(
      response.data.rows.map((product: ProductData) => ({
        value: product.id,
        label: `${product.name}`,
      })),
    );
  }, []);

  useEffect(() => {
    loadProducts();
    loadClients();
  }, [loadClients, loadProducts]);

  useEffect(() => {
    const total = productsList.reduce(
      (acc, current) => acc + current.price * current.quantity,
      0,
    );

    setTotalOrder(Format.currencyBRL(total));
  }, [productsList]);

  const handleSubmit = useCallback(
    async (data: OrderFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          client: Yup.string().required('O cliente é obrigatório'),
          payment_method: Yup.string().required(
            'O método de pagamento é obrigatório',
          ),
          quantity: Yup.number(),
          paymentMethod: Yup.string().oneOf(
            paymentMethodOptions.map(item => item.value),
          ),
        });

        await schema.validate(data, { abortEarly: false });

        if (productsList.length <= 0) {
          addToast({
            type: 'info',
            title: 'Nenhum produto!',
            description: 'Adicione um produto para efetuar o pedido',
          });
          return;
        }

        const formattedData = {
          client_id: data.client,
          total_value: Format.currencyToDB(totalOrder),
          payment_method: data.payment_method,
          discount: 0,
          products: productsList.map(item => ({
            id: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        };

        await api.post('/orders', formattedData);

        history.push('/orders');
        addToast({
          type: 'success',
          title: 'Registro salvo',
          description: 'Venda efetuada com sucesso.',
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
    [addToast, history, productsList, totalOrder],
  );

  const handleChangeProduct = useCallback(async selectedItem => {
    if (Object.keys(selectedItem).length > 0) {
      const response = await api.get('/products', {
        params: {
          id: selectedItem.value,
        },
      });
      const product = response.data.rows[0];
      const formattedPrice = Format.currencyBRL(product.price);
      formRef.current?.setFieldValue('price', formattedPrice);
      formRef.current?.setFieldValue('total_value', formattedPrice);
      formRef.current?.setFieldValue('amount', 1);
      setSelectProduct(product);
    }
  }, []);

  const handleChangeAmount = useCallback(
    e => {
      const unityValue = Number(selectProduct?.price);
      const amount = e.target.value;
      const totalValue = Format.currencyBRL(amount * unityValue);
      formRef.current?.setFieldValue('total_value', totalValue);
    },
    [selectProduct],
  );

  const updateProductAmount = useCallback(
    (productId, amount) => {
      setProductsList(
        productsList.map(item => {
          if (item.id === productId) {
            const newQuantity = item.quantity + amount;
            const newTotalValue = newQuantity * item.price;
            return {
              ...item,
              totalValue:
                newTotalValue >= 0
                  ? Format.currencyBRL(newTotalValue)
                  : 'R$ 0,00',
              quantity: newQuantity >= 0 ? newQuantity : 0,
            };
          }

          return item;
        }),
      );
    },
    [productsList],
  );

  const handleAddProduct = useCallback(() => {
    const formattedPrice = formRef.current?.getFieldValue('unit_value');
    const amount = Number(formRef.current?.getFieldValue('amount'));
    const totalValue = formRef.current?.getFieldValue('total_value');
    const { id, name, price } = selectProduct;

    if (id === 0) {
      addToast({
        type: 'info',
        title: 'Erro!',
        description: 'Selecione um produto',
      });
      return;
    }

    const productIndex = productsList.findIndex(item => item.id === id);

    if (productIndex !== -1) {
      updateProductAmount(id, amount);
    } else {
      setProductsList([
        ...productsList,
        {
          price,
          id,
          formattedPrice,
          name,
          totalValue,
          quantity: amount,
        },
      ]);
    }
  }, [addToast, productsList, selectProduct, updateProductAmount]);

  const handleClickUpdateAmount = useCallback(
    (operation, id) => {
      if (operation === 'add') {
        updateProductAmount(id, 1);
      } else {
        updateProductAmount(id, -1);
      }
    },
    [updateProductAmount],
  );

  const handleDeleteProduct = useCallback(
    index => {
      productsList.splice(index, 1);
      setProductsList([...productsList]);
    },
    [productsList],
  );

  return (
    <Container>
      <Menu />
      <Content>
        <Header>
          <h1>Novo Pedido</h1>
        </Header>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Select
            placeholder="Selecione um cliente"
            options={clients}
            name="client"
          />
          <FormRow>
            <Select
              placeholder="Selecione um produto"
              options={products}
              name="products"
              onChange={item => handleChangeProduct(item)}
            />
          </FormRow>
          <FormRow>
            <InputField
              placeholder="Quantidade"
              type="number"
              min={0}
              name="amount"
              onChange={e => handleChangeAmount(e)}
            />
            <InputField
              placeholder="Valor un."
              type="text"
              name="price"
              readOnly
              disabled
            />
            <InputField
              name="total_value"
              type="text"
              readOnly
              placeholder="Valor total"
            />
          </FormRow>
          <FormRow>
            <Select
              placeholder="Forma de pagamento"
              options={paymentMethodOptions}
              name="payment_method"
            />
            <AddButton type="button" onClick={handleAddProduct}>
              <MdAdd size={58} />
            </AddButton>
          </FormRow>

          {productsList.length > 0 ? (
            <Card marginTop="1rem">
              <Table
                page={0}
                perPage={0}
                totalRows={0}
                handlePagination={() => console.log('nada')}
                header={tableHeader}
                noFooter
              >
                {productsList.map((prod, index) => (
                  <tr key={prod.id}>
                    <td>{prod.name}</td>
                    <QuantityColumn>
                      <MdRemove
                        size={18}
                        className="icon"
                        onClick={() =>
                          handleClickUpdateAmount('remove', prod.id)
                        }
                      />
                      <span>{prod.quantity}</span>
                      <MdAdd
                        size={18}
                        onClick={() => handleClickUpdateAmount('add', prod.id)}
                      />
                    </QuantityColumn>
                    <td>{Format.currencyBRL(prod.price)}</td>
                    <td>{prod.totalValue}</td>
                    <td>
                      <button
                        type="button"
                        data-testid="btn-show-modal"
                        onClick={() => handleDeleteProduct(index)}
                      >
                        <MdDeleteForever size={26} color="#E01818" />
                      </button>
                    </td>
                  </tr>
                ))}
              </Table>
              <TotalOrder>
                <p>
                  Total Pedido: <span>{totalOrder}</span>
                </p>
              </TotalOrder>
            </Card>
          ) : null}

          <FormButtons />
        </Form>
      </Content>
    </Container>
  );
};

export default OrderForm;
