import React, { useRef, useEffect } from 'react';
import ReactSelect, {
  OptionTypeBase,
  Props as SelectProps,
} from 'react-select';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

interface Props extends SelectProps<OptionTypeBase> {
  name: string;
}

const Select: React.FC<Props> = ({ name, label, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const customStyles = {
    width: '100%',
    placeholder: (provided: any, state: any) => {
      return {
        ...provided,
        color: '#666360',
      };
    },
    option: (provided: any, state: any) => {
      return {
        ...provided,
        color: '#327295',
        background: state.isSelected ? '#DDD' : '',
      };
    },
    control: (provided: any, state: any) => {
      return {
        ...provided,
        color: '#666360',
        minHeight: 42.38,
        border:
          error && !state.hasValue
            ? '1px solid #c53030'
            : state.isFocused
            ? '1px solid #ff92b9'
            : '1px solid #b5b5b5',
        borderRadius: '8px',
        boxShadow: 'none',
        borderColor: '#ff92b9',
        '&:hover': {
          borderColor: '#ff92b9',
        },
        padding: 8,
        fontSize: '1.5rem',
        fontWeight: 500,
      };
    },
  };

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
      setValue: (ref: any, value: any) => {
        ref.select.setValue(value);
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <Container>
      <ReactSelect
        placeholder={label}
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="react-select"
        styles={customStyles}
        {...rest}
      />
      {error && <Error>{error}</Error>}
    </Container>
  );
};

export default Select;
