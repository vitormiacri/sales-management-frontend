import styled from 'styled-components';

interface FooterProps {
  noFooter: boolean | undefined;
}

export const Container = styled.table<FooterProps>`
  width: 100%;

  tr {
    width: 100%;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0.9rem 0;
    transition: background 0.3s;

    th {
      width: 20%;
      color: #474747;
      font-weight: 700;
      font-size: 1.2vw;
      &:nth-child(2) {
        width: ${({ noFooter }) => (noFooter ? '20%' : '40%')};
      }
    }

    td {
      width: 20%;
      text-align: center;
      color: #5c5454;
      font-size: 1vw;
      &:nth-child(2) {
        width: ${({ noFooter }) => (noFooter ? '20%' : '40%')};
      }

      button {
        background: transparent;
        border: none;
        &:last-of-type {
          margin-left: 0.8rem;
        }
      }
    }
  }

  thead {
    width: 100%;
  }

  tbody {
    overflow-y: auto;
    height: 100%;

    tr {
      &:last-child {
        border: none;
      }
      &:hover {
        background: #f1f1f1;
      }
    }
  }
`;

export const Footer = styled.div<FooterProps>`
  width: 100%;
  display: ${({ noFooter }) => (noFooter ? 'none' : 'flex')};
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1.5rem;
  border-top: 1px solid #ccc;
  font-size: 1vw;

  > div {
    border: 1px solid #ccc;
    border-radius: 50%;
    padding: 0.5rem 1rem;
  }

  button {
    display: flex;
    align-items: center;
    background: transparent;
    border: none;

    &:hover {
      color: #ff92ba;
    }

    svg {
      margin: 0 0.5rem;
    }
  }
`;
