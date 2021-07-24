import styled from 'styled-components';

export const Container = styled.div`
  background: linear-gradient(180deg, #ff92b9 0%, #ffc0f9 100%);
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 5rem;
`;

export const Card = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 5rem;
  margin-top: 2rem;

  p {
    color: #595959;
    font-size: 2rem;
    letter-spacing: 0.08em;
    font-weight: bold;
    margin-bottom: 2rem;
  }
`;
