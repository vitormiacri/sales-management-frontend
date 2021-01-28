import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused?: boolean;
  isFilled?: boolean;
  isErrored: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  margin: 0.5em 0;
`;

export const Error = styled.p`
  color: #c53030;
  margin: 0;
  padding: 0.5em 0;
`;
