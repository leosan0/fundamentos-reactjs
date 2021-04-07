import React, { useRef, useState, useEffect, useCallback } from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { useField } from '@unform/core';
import 'react-datepicker/dist/react-datepicker.css';

import { Container, Error } from './styles';

interface DatePickerProps extends Omit<ReactDatePickerProps, 'onChange'> {
  name: string;
  containerStyle?: object;
  icon?: React.ComponentType<IconBaseProps>;
}

const DatePicker: React.FC<DatePickerProps> = ({
  name,
  containerStyle = {},
  icon: Icon,
  ...rest
}) => {
  const datepickerRef = useRef<ReactDatePicker>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [date, setDate] = useState(defaultValue || null);

  const handleDatePickerBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!datepickerRef.current?.props.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: datepickerRef.current,
      path: 'props.selected',
      clearValue: (ref: any) => {
        ref.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container
      style={containerStyle}
      isErrored={!!error}
      isFilled={isFilled}
      isFocused={isFocused}
    >
      {Icon && <Icon size={20} />}

      <ReactDatePicker
        ref={datepickerRef}
        dateFormat="dd/MM/yyyy"
        startDate={new Date()}
        onFocus={() => setIsFocused(true)}
        onClickOutside={handleDatePickerBlur}
        onSelect={handleDatePickerBlur}
        selected={date}
        onChange={setDate}
        // onBlur={handleDatePickerBlur}
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

export default DatePicker;
