import React, { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import {
  MdDashboard,
  MdLocalAtm,
  MdWork,
  MdSupervisorAccount,
  MdPerson,
  MdSubdirectoryArrowLeft,
} from 'react-icons/md';

import { Container, MenuList, UserInfo } from './styles';
import Logo from '../../assets/logo-signin.png';
import { useAuth } from '../../hooks/Auth';

const Menu: React.FC = () => {
  const { signOut, user } = useAuth();

  const handleLogout = useCallback(() => {
    signOut();
  }, [signOut]);

  return (
    <Container>
      <img className="logo" src={Logo} alt="Carina Sabonetes Artesanais" />
      <UserInfo>{`Olá ${user.name}`}</UserInfo>
      <MenuList>
        <ul>
          <li>
            <NavLink activeClassName="active" to="/dashboard" title="Dashboard">
              <MdDashboard />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/sales" title="Vendas">
              <MdLocalAtm />
              <span>Vendas</span>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/products" title="Produtos">
              <MdWork />
              <span>Produtos</span>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/clients" title="Clientes">
              <MdSupervisorAccount />
              <span>Clientes</span>
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/users" title="Usuários">
              <MdPerson />
              <span>Usuários</span>
            </NavLink>
          </li>
        </ul>
        <button type="button" onClick={handleLogout} title="Sair">
          <MdSubdirectoryArrowLeft size={26} />
          <span>Sair</span>
        </button>
      </MenuList>
    </Container>
  );
};

export default Menu;
