import React from 'react';
import { MdDone } from 'react-icons/md';
import { ContainerFormButtons, SaveButton } from '../../styles/global';
import CancelButton from '../CancelButton';

const FormButtons: React.FC = () => (
  <ContainerFormButtons>
    <CancelButton />
    <SaveButton type="submit">
      <MdDone size={26} />
      Salvar
    </SaveButton>
  </ContainerFormButtons>
);

export default FormButtons;
