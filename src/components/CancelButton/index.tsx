import React, { useCallback } from 'react';
import { MdArrowBack } from 'react-icons/md';
import { useHistory } from 'react-router-dom';

import { CancelButton } from '../../styles/global';

const Cancel: React.FC = () => {
  const history = useHistory();
  const handleCancel = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <CancelButton type="button" onClick={handleCancel}>
      <MdArrowBack size={26} />
      Cancelar
    </CancelButton>
  );
};

export default Cancel;
