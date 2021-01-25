import React from 'react';
import Loader from 'react-loader-spinner';

import { Container, ContainerLoading } from './styles';

interface CardProps {
  loading?: boolean;
}

const Card: React.FC<CardProps> = ({ loading, children }) => {
  return (
    <Container>
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
