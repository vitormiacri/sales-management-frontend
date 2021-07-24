import styled from 'styled-components';

interface CardProps {
  marginTop?: string;
}
export const Container = styled.div<CardProps>`
  width: 100%;
  padding: 0;
  border-radius: 20px;
  border: 1px solid #dadada;
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.05);
  margin-top: ${({ marginTop }) => marginTop || '0'};
`;

export const ContainerLoading = styled.div`
  margin: 3em;
  text-align: center;
`;
