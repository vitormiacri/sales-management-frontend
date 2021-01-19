import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  background: linear-gradient(180deg, #fb95b9 0%, #ff96f5 100%);
  width: calc(100% - 75%);
  max-width: 350px;

  border-top-right-radius: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  .logo {
    margin-top: 2rem;
    width: 55%;
  }
`;

export const MenuList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
  padding: 2rem 0;
  width: 100%;

  ul {
    width: 100%;
    list-style: none;
    display: flex;
    flex-direction: column;
    padding-left: 3rem;

    li {
      font-size: 1.5vw;
      font-weight: 600;
      align-self: flex-start;
      width: 100%;
      margin: 0.3rem 0;

      a {
        display: flex;
        width: 100%;
        color: #fff;
        text-decoration: none;
        padding: 0.8rem 0;
        padding-left: 1rem;
        align-items: center;
        letter-spacing: 0.05rem;

        svg {
          margin-right: 0.5rem;
          @media screen and (max-width: 768px) {
            font-size: 1.5rem;
          }
        }

        &.active,
        &:hover {
          background-color: #fff;
          width: 100%;
          color: #ff92ba;
          border-top-left-radius: 20px;
          border-bottom-left-radius: 20px;
          transition: color 0.3s, background-color 0.3s;
        }
        span {
          @media screen and (max-width: 768px) {
            display: none;
            font-size: 1.5rem;
          }
        }
      }
    }
  }

  button {
    width: 100%;
    color: #fff;
    font-size: 1.5vw;
    font-weight: 600;
    border: none;
    background: none;
    display: flex;
    align-items: center;
    padding: 0.8rem 0;
    padding-left: 1rem;
    margin-left: 6rem;

    svg {
      margin-right: 0.5rem;
      @media screen and (max-width: 768px) {
        font-size: 1.5rem;
      }
    }
    &:hover {
      background-color: #fff;
      width: 100%;
      color: #ff92ba;
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      transition: color 0.3s, background-color 0.3s;
    }

    span {
      @media screen and (max-width: 768px) {
        display: none;
      }
    }
  }
`;

export const UserInfo = styled.p`
  color: #fff;
  font-size: 1.2vw;
  font-weight: 600;
  margin-top: 1.5rem;
`;
