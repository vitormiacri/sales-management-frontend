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
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 0;
  border: 1px solid #dadada;
  border-left: 5px solid ${({ theme }) => theme.primaryColor};
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
  font-size: 1vw;
  color: #5c5454;
  letter-spacing: 0.5px;
  font-weight: 700;
`;

export const OrderHistory = styled.div`
  width: 50%;
  margin-top: 1.5rem;
`;

export const Title = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  font-size: 1.3vw;
  color: #5c5454;
  font-weight: 700;
`;

export const Graphics = styled.div`
  width: 50%;
  height: 310px;
`;

export const ContentDashboard = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;
