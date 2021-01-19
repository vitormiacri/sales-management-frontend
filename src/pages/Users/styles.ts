import styled from 'styled-components';
import Button from '../../components/Button';

export const Header = styled.div`
  display: flex;
  margin: 2rem 0;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  h1 {
    color: #7a7a7a;
    font-weight: 700;
    font-size: 2.3vw;
  }
`;

export const AddButton = styled(Button)`
  max-width: 200px;
  font-size: 1.5vw;
  text-transform: none;
  letter-spacing: 0;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0;

  svg {
    margin-right: 0.5rem;
  }
`;
