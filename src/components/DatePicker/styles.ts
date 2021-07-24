import styled, { css } from 'styled-components';

interface ContainerProps {
  isDisabled?: boolean;
  isErrored: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  margin-right: 8px;
`;

export const ContainerInput = styled.div<ContainerProps>`
  background: #fff;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  padding: 0.7em;
  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isDisabled &&
    css`
      background: #eee;
      cursor: not-allowed;
    `}

  input {
    background: transparent;
    flex: 1;
    border: 0;
    color: #ff92ba;

    ${props =>
      props.isDisabled &&
      css`
        cursor: not-allowed;
      `}

    &::placeholder {
      color: #999;
    }
  }

  svg {
    margin-left: 10px;
  }
`;

export const Label = styled.p<ContainerProps>`
  text-transform: uppercase;
  color: #444;
  font-weight: 700;
  margin: 1.2em 0 0.5em;

  ${props =>
    props.isErrored &&
    css`
      color: #c53030;
    `}
`;
