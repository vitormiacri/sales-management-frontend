import styled from 'styled-components';

export const QuantityColumn = styled.td`
  span {
    margin: 0 0.6em;
  }
  svg {
    cursor: pointer;

    &:hover {
      color: #000;
    }
  }
`;

export const TotalOrder = styled.div`
  border-top: 2px solid #dadada;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  text-transform: uppercase;
  font-weight: bold;
  color: #444;

  p {
    padding: 1em;
    span {
      margin-left: 6em;
      margin-right: 4.5em;
    }
  }
`;
