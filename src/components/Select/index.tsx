import React, { useRef, useEffect, useState, useCallback } from 'react';
import { OptionTypeBase, Props as SelectProps } from 'react-select';
import { useField } from '@unform/core';

import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { Container, CustomSelect, Error } from './styles';

interface Props extends SelectProps<OptionTypeBase> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Select: React.FC<Props> = ({ name, icon: Icon, ...rest }) => {
  const selectRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const handleSelectBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!selectRef.current?.value);
  }, []);

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
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <Container isFocused={isFocused} isErrored={!!error} isFilled={isFilled}>
      {Icon && <Icon size={20} />}
      <CustomSelect
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="react-select"
        onFocus={() => setIsFocused(true)}
        onBlur={handleSelectBlur}
        {...rest}
      />

      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Select;
