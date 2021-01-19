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
    background: #FFF;
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
  max-width: 160px;
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
  max-width: 170px;
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
