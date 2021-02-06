import styled from 'styled-components';

export const SumaryTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 1.5rem;
`;

export const Card = styled.div`
  width: 22%;
  padding: 0;
  border-radius: 20px;
  border: 1px solid #dadada;
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 0;
`;

export const Value = styled.p`
  font-size: 2vw;
  color: #26d723;
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: 1px;
  margin-top: 0.5rem;
`;

export const Description = styled.p`
  font-size: 0.8vw;
  color: #5c5454;
  letter-spacing: 0.5px;
  font-weight: 700;
`;
