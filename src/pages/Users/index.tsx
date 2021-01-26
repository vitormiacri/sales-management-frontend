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

interface UsersList {
  id: number;
  name: string;
  email: string;
}

const Users: React.FC = () => {
  const tableHeader = ['Nome', 'E-mail'];
  const history = useHistory();
  const { addToast } = useToast();
  const [userName, setProductName] = useState('');
  const [users, setUsers] = useState<UsersList[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState(0);

  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);

  const limit = 8;

  const loadUsers = useCallback(
    async search => {
      try {
        setLoading(true);
        let response;
        if (search) {
          setPage(1);
          response = await api.get('/users', {
            params: {
              name: search,
            },
          });
        } else {
          response = await api.get('/users', {
            params: {
              page,
              limit,
            },
          });
        }

        setUsers(response.data.rows);
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
    loadUsers(null);
  }, [loadUsers]);

  useEffect(() => {
    loadUsers(userName);
  }, [loadUsers, userName]);

  const handleEdit = useCallback(
    (id: number) => {
      history.push(`/users/edit/${id}`);
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
    history.push('users/add');
  }, [history]);

  const confirmDeleteModal = useCallback((id: number) => {
    setUserId(id);
    setShowModal(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    try {
      await api.delete(`/users/${userId}`);
      setShowModal(false);
      loadUsers(null);
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
  }, [addToast, loadUsers, userId]);

  return (
    <Container>
      <Menu />
      <Content>
        <Header>
          <h1>Produtos</h1>
          <div>
            <input
              type="text"
              value={userName}
              onChange={e => setProductName(e.target.value)}
              placeholder="Buscar usuário"
            />
            <AddButton type="button" onClick={clickAdd}>
              <MdAddCircleOutline size={26} />
              Adicionar
            </AddButton>
          </div>
        </Header>
        <Card loading={loading}>
          {users.length > 0 ? (
            <Table
              header={tableHeader}
              page={page}
              perPage={limit}
              handlePagination={handlePagination}
              totalRows={totalRows}
            >
              {users.map(p => (
                <tr>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.email}</td>

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
            <Empty data-testid="empty">Nenhum usuário encontrado</Empty>
          )}
        </Card>
        <Modal
          show={showModal}
          handleClose={() => setShowModal(false)}
          handleConfirm={() => handleConfirmDelete()}
          showFooter
          showTitle
        >
          <span>Você confirma a exclusão deste usuário?</span>
        </Modal>
      </Content>
    </Container>
  );
};

export default Users;
