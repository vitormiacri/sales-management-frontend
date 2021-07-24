import styled from 'styled-components';
import { darken, shade } from 'polished';

interface ContainerProps {
  show?: boolean;
}
export const Container = styled.div<ContainerProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;

  background: rgba(0, 0, 0, 0.7);

  display: ${props => (props.show ? 'block' : 'none')};
`;

export const ModalBody = styled.div`
  position: fixed;
  top: 30%;
  left: 50%;
  z-index: 5;
  background: #fff;
  padding: 2em 2em 1em;
  width: 50%;
  border-radius: 4px;
  text-align: center;
  font-size: 1.2em;
  color: #999;

  transform: translate(-50%, 0);

  footer {
    margin-top: 1em;
    padding-top: 1em;
    border-top: 1px solid #eee;

    display: flex;
    justify-content: flex-end;
    flex-grow: 0;

    button {
      height: 45px;
      background: linear-gradient(270deg, #ff96f5 0%, #ff92ba 100%);
      border: none;
      border-radius: 4px;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      line-height: 1.9;
      padding: 0.5em 1em;

      &:hover {
        background: ${shade(0.1, '#ff92ba')};
      }

      &:first-of-type {
        background: #eee;
        color: #999;
        margin-right: 1em;

        &:hover {
          background: ${darken(0.03, '#EEE')};
        }
      }
    }
  }
`;

export const ModalTitle = styled.p`
  text-align: center;
  font-weight: bold;
  font-size: 1.5em;
  margin-bottom: 1em;
  color: #444;
`;
