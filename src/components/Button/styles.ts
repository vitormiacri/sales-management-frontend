import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #ff9000;
  height: 56px;
  border-radius: 10px;
  border: 0;
  width: 100%;
  padding: 0 16px;
  color: #312e38;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.4s;

  &:hover {
    background: ${shade(0.2, '#ff9000')};
  }
`;
