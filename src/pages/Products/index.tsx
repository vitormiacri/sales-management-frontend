import React, { useCallback, useEffect, useState } from 'react';
import { MdAddCircleOutline, MdDeleteForever, MdEdit } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import Card from '../../components/Card';
import Menu from '../../components/Menu';
import Modal from '../../components/Modal';
import Table from '../../components/Table';
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

interface ProductsList {
  id: number;
  name: string;
  cost: string;
  price: string;
  quantity: number;
  stock_amount: number;
}

interface ApiResponse<T> {
  count: number;
  rows: T[];
}

const Products: React.FC = () => {
  const tableHeader = ['Nome', 'Vl. Custo', 'Vl. Venda', 'Estoque'];
  const history = useHistory();
  const { addToast } = useToast();
  const [productName, setProductName] = useState('');
  const [products, setProducts] = useState<ProductsList[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [productId, setProductId] = useState(0);

  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);

  const limit = 10;

  const loadProducts = useCallback(
    async search => {
      try {
        setLoading(true);
        let response;
        if (search) {
          setPage(1);
          response = await api.get('/products', {
            params: {
              name: search,
            },
          });
        } else {
          response = await api.get('/products', {
            params: {
              page,
              limit,
            },
          });
        }

        setProducts(
          response.data.rows.map((item: ProductsList) => ({
            ...item,
            price: Format.currencyBRL(Number(item.price)),
            cost: Format.currencyBRL(Number(item.cost)),
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
    loadProducts(null);
  }, [loadProducts]);

  useEffect(() => {
    loadProducts(productName);
  }, [loadProducts, productName]);

  const handleEdit = useCallback(
    (id: number) => {
      history.push(`/products/edit/${id}`);
    },
    [history],
  );

  const handlePagination = useCallback(
    type => {
      setPage(type === 'back' ? page - 1 : page + 1);
    },
    [page],
  );

  const clickAdd = useCallback(() => {
    history.push('products/add');
  }, [history]);

  const confirmDeleteModal = useCallback((id: number) => {
    setProductId(id);
    setShowModal(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    try {
      await api.delete(`/products/${productId}`);
      setShowModal(false);
      loadProducts(null);
      addToast({
        type: 'success',
        title: 'Sucesso!',
        description: 'Produto excluído.',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro!',
        description: 'Ocorreu ao excluir. Aguarde e tente novamente!',
      });
    }
  }, [addToast, loadProducts, productId]);

  return (
    <Container>
      <Menu />
      <Content>
        <Header>
          <h1>Produtos</h1>
          <div>
            <input
              type="text"
              value={productName}
              onChange={e => setProductName(e.target.value)}
              placeholder="Buscar produto"
            />
            <AddButton type="button" onClick={clickAdd}>
              <MdAddCircleOutline size={26} />
              Adicionar
            </AddButton>
          </div>
        </Header>
        <Card loading={loading}>
          {products.length > 0 ? (
            <Table
              header={tableHeader}
              page={page}
              perPage={limit}
              handlePagination={handlePagination}
              totalRows={totalRows}
            >
              {products.map(p => (
                <tr>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.cost}</td>
                  <td>{p.price}</td>
                  <td>{p.stock_amount}</td>
                  <td>
                    <button
                      data-testid="btn-edit"
                      type="button"
                      onClick={() => handleEdit(p.id)}
                    >
                      <MdEdit size={26} color="#5C5454" />
                    </button>
                    <button
                      type="button"
                      data-testid="btn-show-modal"
                      onClick={() => confirmDeleteModal(p.id)}
                    >
                      <MdDeleteForever size={26} color="#E01818" />
                    </button>
                  </td>
                </tr>
              ))}
            </Table>
          ) : (
            <Empty data-testid="empty">Nenhum produto encontrado</Empty>
          )}
        </Card>
        <Modal
          show={showModal}
          handleClose={() => setShowModal(false)}
          handleConfirm={() => handleConfirmDelete()}
          showFooter
          showTitle
        >
          <span>Você confirma a exclusão do produto?</span>
        </Modal>
      </Content>
    </Container>
  );
};

export default Products;
