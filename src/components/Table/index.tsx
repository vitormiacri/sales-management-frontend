import React from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import { Container, Footer } from './styles';

interface TableProps {
  header: string[];
  page: number;
  perPage: number;
  totalRows: number;
  noFooter?: boolean;
  noActions?: boolean;
  handlePagination(type: string): void;
  children: React.ReactNode;
}

const Table: React.FC<TableProps> = ({
  header,
  page,
  perPage,
  totalRows,
  noFooter,
  noActions,
  handlePagination,
  children,
}) => {
  const hasNextPage = perPage * page >= totalRows;
  return (
    <Container noFooter={noFooter}>
      <table>
        <thead>
          <tr>
            <th hidden={noFooter}>#</th>
            {header.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
            <th hidden={noActions}>Ações</th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
      <Footer noFooter={noFooter}>
        <button
          type="button"
          disabled={page < 2}
          onClick={() => handlePagination('back')}
        >
          <MdKeyboardArrowLeft size={26} />
          Anterior
        </button>
        <div>{page}</div>
        <button
          type="button"
          disabled={hasNextPage}
          onClick={() => handlePagination('next')}
        >
          Próxima
          <MdKeyboardArrowRight size={26} />
        </button>
      </Footer>
    </Container>
  );
};

export default Table;
