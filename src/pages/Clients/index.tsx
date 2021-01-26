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

interface ClientsList {
  id: number;
  name: string;
  address: string;
}

interface ApiResponse<T> {
  count: number;
  rows: T[];
}

const Products: React.FC = () => {
  const tableHeader = ['Nome', 'Endereço'];
  const history = useHistory();
  const { addToast } = useToast();
  const [clientName, setClientName] = useState('');
  const [clients, setClients] = useState<ClientsList[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [clientId, setClientId] = useState(0);

  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);

  const limit = 8;

  const loadClients = useCallback(
    async search => {
      try {
        setLoading(true);
        let response;
        if (search) {
          setPage(1);
          response = await api.get('/clients', {
            params: {
              name: search,
            },
          });
        } else {
          response = await api.get('/clients', {
            params: {
              page,
              limit,
            },
          });
        }

        setClients(response.data.rows);
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
    loadClients(null);
  }, [loadClients]);

  useEffect(() => {
    loadClients(clientName);
  }, [loadClients, clientName]);

  const handleEdit = useCallback(
    (id: number) => {
      history.push(`/clients/edit/${id}`);
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
    history.push('/clients/add');
  }, [history]);

  const confirmDeleteModal = useCallback((id: number) => {
    setClientId(id);
    setShowModal(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    try {
      await api.delete(`/clients/${clientId}`);
      setShowModal(false);
      loadClients(null);
      addToast({
        type: 'success',
        title: 'Sucesso!',
        description: 'Cliente excluído.',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro!',
        description: 'Ocorreu ao excluir. Aguarde e tente novamente!',
      });
    }
  }, [addToast, loadClients, clientId]);

  return (
    <Container>
      <Menu />
      <Content>
        <Header>
          <h1>Clientes</h1>
          <div>
            <input
              type="text"
              value={clientName}
              onChange={e => setClientName(e.target.value)}
              placeholder="Buscar cliente"
            />
            <AddButton type="button" onClick={clickAdd}>
              <MdAddCircleOutline size={26} />
              Adicionar
            </AddButton>
          </div>
        </Header>
        <Card loading={loading}>
          {clients.length > 0 ? (
            <Table
              header={tableHeader}
              page={page}
              perPage={limit}
              handlePagination={handlePagination}
              totalRows={totalRows}
            >
              {clients.map(p => (
                <tr>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.address}</td>
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
            <Empty data-testid="empty">Nenhum cliente encontrado</Empty>
          )}
        </Card>
        <Modal
          show={showModal}
          handleClose={() => setShowModal(false)}
          handleConfirm={() => handleConfirmDelete()}
          showFooter
          showTitle
        >
          <span>Você confirma a exclusão deste cliente?</span>
        </Modal>
      </Content>
    </Container>
  );
};

export default Products;
