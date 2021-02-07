import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: ${({ theme }) => theme.backgroundColor};
  border-radius: 8px;
  border: 1px solid #b5b5b5;
  width: 100%;
  padding: 16px;
  color: #b5b5b5;

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
    props.isFocused &&
    css`
      color: #ff92b9;
      border-color: #ff92b9;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #ff92b9;
    `}

  input {
    background: transparent;
    flex: 1;
    border: 0;
    color: #666360;
    font-size: 1.5rem;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
