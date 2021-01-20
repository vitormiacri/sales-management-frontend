import React, { useCallback } from 'react';
import { MdAddCircleOutline } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import Menu from '../../components/Menu';
import { Container, Content, Header, AddButton } from '../../styles/global';

const Users: React.FC = () => {
  const history = useHistory();

  const clickAdd = useCallback(() => {
    history.push('users/add');
  }, [history]);

  return (
    <Container>
      <Menu />
      <Content>
        <Header>
          <h1>Usuários</h1>
          <AddButton type="button" onClick={clickAdd}>
            <MdAddCircleOutline size={26} />
            Adicionar
          </AddButton>
        </Header>
      </Content>
    </Container>
  );
};

export default Users;
