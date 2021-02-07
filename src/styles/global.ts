import styled, { createGlobalStyle } from 'styled-components';
import Button from '../components/Button';

export default createGlobalStyle`
    * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.backgroundColor};
    color: #000;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 16px 'Open Sans', serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }
`;

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: flex-start;
`;

export const Content = styled.div`
  margin: 0 2rem;
  width: 100%;
`;

export const ContainerFormButtons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 2rem !important;
`;

export const SaveButton = styled(Button)`
  max-width: 170px;
  font-size: 1.5vw;
  text-transform: none;
  letter-spacing: 0;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0;

  svg {
    margin-right: 0.5rem;
  }
`;

export const CancelButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  max-width: 190px;
  border-radius: 8px;
  border: solid 1px #7a7a7a;
  width: 100%;
  padding: 0 16px;
  color: #7a7a7a;
  font-weight: bold;
  font-size: 1.5vw;
  height: 50px;
  margin-right: 0.5rem;

  svg {
    margin-right: 0.5rem;
  }
`;

export const Header = styled.div`
  display: flex;
  margin: 2rem 0;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  h1 {
    color: #7a7a7a;
    font-weight: 700;
    font-size: 2.3vw;
  }

  & > div {
    display: flex;

    & > input {
      width: 300px;
      border: none;
      border-bottom: 1px solid #7a7a7a;
      padding: 0 1rem;
      margin-right: 1rem;
      background: ${({ theme }) => theme.backgroundColor};
    }
  }
`;

export const AddButton = styled(Button)`
  max-width: 200px;
  font-size: 1.5vw;
  text-transform: none;
  letter-spacing: 0;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0;

  span {
    margin-left: 0.5rem;
  }
`;

export const FormRow = styled.div`
  width: 100%;
  display: flex;
  margin-top: 8px;
  align-items: center;

  & > :first-child {
    margin-left: 0;
  }

  & > div {
    margin-top: 0 !important;
    margin-left: 8px;
  }

  button {
    height: 65px;
    margin-left: 8px;
  }
`;

export const Empty = styled.div`
  width: 100%;
  font-size: 1.2rem;
  color: #444;
  text-align: center;
  padding: 5rem 0;
`;
