import React, { useRef, useEffect } from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { useField } from '@unform/core';
import { FaRegCalendarAlt } from 'react-icons/fa';
import ptBR from 'date-fns/locale/pt-BR';

import 'react-datepicker/dist/react-datepicker.css';

import { Container, ContainerInput } from './styles';

interface Props extends Omit<ReactDatePickerProps, 'onChange'> {
  name: string;
  initialValue: any;
  handleChange: any;
}

const DatePicker: React.FC<Props> = ({
  name,
  initialValue,
  handleChange,
  ...rest
}) => {
  const datepickerRef = useRef(null);
  const { fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: datepickerRef.current,
      path: 'props.selected',
      clearValue: (ref: any) => {
        ref.clear();
      },
      setValue: (ref: any, value: any) => {
        return value;
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <ContainerInput isErrored={!!error}>
        <ReactDatePicker
          ref={datepickerRef}
          selected={initialValue}
          onChange={value => handleChange(value)}
          locale={ptBR}
          dateFormat="dd/MM/yyyy"
          {...rest}
        />
        <FaRegCalendarAlt color="#444" size={20} />
      </ContainerInput>
    </Container>
  );
};

export default DatePicker;
