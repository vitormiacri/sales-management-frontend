import React from 'react';
import Loader from 'react-loader-spinner';

import { Container, ContainerLoading } from './styles';

interface CardProps {
  loading?: boolean;
  marginTop?: string;
}

const Card: React.FC<CardProps> = ({ loading, marginTop, children }) => {
  return (
    <Container marginTop={marginTop}>
      {loading ? (
        <ContainerLoading>
          <Loader
            data-testid="card-loading"
            type="Oval"
            color="#ff92ba"
            height={120}
            width={120}
          />
        </ContainerLoading>
      ) : (
        children
      )}
    </Container>
  );
};

export default Card;
