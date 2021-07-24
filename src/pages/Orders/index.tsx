/* eslint-disable @typescript-eslint/camelcase */
import { format, parseISO } from 'date-fns';
import React, { useCallback, useEffect, useState } from 'react';
import { MdAddCircleOutline, MdSearch } from 'react-icons/md';
import { useHistory } from 'react-router-dom';

import { Card, Menu, Table, Modal } from '../../components';
import { useToast } from '../../hooks/Toast';
import api from '../../services/api';
import {
  Container,
  Content,
  Header,
  AddButton,
  Empty,
} from '../../styles/global';

import Format from '../../utils/format';

interface ProductDetail {
  name: string;
  price: number;
  quantity: number;
}
interface OrdersList {
  id: string;
  total_value: number;
  payment_date: string;
  payment_method: 'credito' | 'debito' | 'dinheiro';
  discount: number;
  client_id: number;
  createdAt: string;
  client: {
    name: string;
    address: string;
  };
  Products: {
    name: string;
    OrdersProducts: {
      price: number;
      quantity: number;
    };
  }[];
}

interface ApiResponse<T> {
  count: number;
  rows: T[];
}

const Orders: React.FC = () => {
  const tableHeader = ['Cliente', 'Data Venda', 'Forma Pgto.', 'Valor'];
  const paymentMethods = {
    credito: 'Crédito',
    dinheiro: 'Dinheiro',
    debito: 'Crédito',
  };
  const history = useHistory();
  const { addToast } = useToast();
  const [orders, setOrders] = useState<OrdersList[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [orderDetail, setOrderDetail] = useState<ProductDetail[]>([]);

  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);

  const limit = 10;

  const loadOrders = useCallback(
    async search => {
      try {
        setLoading(true);
        let response;
        if (search) {
          setPage(1);
          response = await api.get<ApiResponse<OrdersList>>('/orders', {
            params: {
              id: search,
            },
          });
        } else {
          response = await api.get('/orders', {
            params: {
              page,
              limit,
            },
          });
        }

        setOrders(
          response.data.rows.map((order: OrdersList) => ({
            ...order,
            payment_method: paymentMethods[order.payment_method],
            payment_date:
              order.payment_date &&
              format(parseISO(order.payment_date), 'dd/MM/yyyy'),
            createdAt: format(parseISO(order.createdAt), 'dd/MM/yyyy'),
            total_value: Format.currencyBRL(order.total_value),
          })),
        );
        setTotalRows(response.data.count);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro!',
          description: 'Ocorreu na consulta. Tente novamente!',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, page],
  );

  useEffect(() => {
    loadOrders(null);
  }, [loadOrders]);

  useEffect(() => {
    loadOrders(orderId);
  }, [loadOrders, orderId]);

  const handlePagination = useCallback(
    type => {
      setPage(type === 'back' ? page - 1 : page + 1);
    },
    [page],
  );

  const clickAdd = useCallback(() => {
    history.push('/orders/add');
  }, [history]);

  const handleViewDetailsModal = useCallback(
    (id: string) => {
      const order = orders.find(o => o.id === id);
      if (order) {
        setOrderDetail(
          order.Products.map(prod => ({
            name: prod.name,
            price: prod.OrdersProducts.price,
            quantity: prod.OrdersProducts.quantity,
          })),
        );
        setShowModal(true);
      }
    },
    [orders],
  );

  return (
    <Container>
      <Menu />
      <Content>
        <Header>
          <h1>Pedidos</h1>
          <div>
            <input
              type="text"
              value={orderId}
              onChange={e => setOrderId(e.target.value)}
              placeholder="Buscar pedido"
            />
            <AddButton type="button" onClick={clickAdd}>
              <MdAddCircleOutline size={26} />
              <span>Adicionar</span>
            </AddButton>
          </div>
        </Header>
        <Card loading={loading}>
          {orders.length > 0 ? (
            <Table
              header={tableHeader}
              page={page}
              perPage={limit}
              handlePagination={handlePagination}
              totalRows={totalRows}
            >
              {orders.map(order => (
                <tr>
                  <td>{order.id}</td>
                  <td>{order.client.name}</td>
                  <td>{order.createdAt}</td>
                  <td>{order.payment_method}</td>
                  <td>{order.total_value}</td>
                  <td>
                    <button
                      type="button"
                      data-testid="btn-show-modal"
                      onClick={() => handleViewDetailsModal(order.id)}
                      title="Ver produtos"
                    >
                      <MdSearch size={26} color="#5C5454" />
                    </button>
                  </td>
                </tr>
              ))}
            </Table>
          ) : (
            <Empty data-testid="empty">Nenhum pedido encontrado</Empty>
          )}
        </Card>
        <Modal show={showModal} handleClose={() => setShowModal(false)}>
          <Table
            page={0}
            perPage={0}
            totalRows={0}
            handlePagination={() => console.log('nada')}
            header={['Produto', 'Quantidade', 'Preço Un.', 'Preço Total']}
            noFooter
            noActions
          >
            {orderDetail &&
              orderDetail.map(p => (
                <tr>
                  <td>{p.name}</td>
                  <td>{p.quantity}</td>
                  <td>{p.price}</td>
                  <td>{Format.currencyBRL(p.price * p.quantity)}</td>
                </tr>
              ))}
          </Table>
        </Modal>
      </Content>
    </Container>
  );
};

export default Orders;
