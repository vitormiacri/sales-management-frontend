import React from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import { Container } from './styles';

interface TableProps {
  header: string[];
  page: number;
  perPage: number;
  totalRows: number;
  handlePagination(type: string): void;
  children: React.ReactNode;
}

const Table: React.FC<TableProps> = ({
  header,
  page,
  perPage,
  totalRows,
  handlePagination,
  children,
}) => {
  const hasNextPage = perPage * page >= totalRows;
  return (
    <Container>
      <thead>
        <tr>
          <th>#</th>
          {header.map((item, index) => (
            <th key={index}>{item}</th>
          ))}
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
      <footer>
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
      </footer>
    </Container>
  );
};

export default Table;
