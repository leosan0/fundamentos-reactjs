import React, { useRef, useState, useEffect, useCallback } from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { useField } from '@unform/core';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import { Container } from './styles';

interface DatePickerProps extends Omit<ReactDatePickerProps, 'onChange'> {
  name: string;
  containerStyle?: object;
  icon?: React.ComponentType<IconBaseProps>;
}

const MonthYearPicker: React.FC<DatePickerProps> = ({
  name,
  containerStyle = {},
  icon: Icon,
  ...rest
}) => {
  const datepickerRef = useRef<ReactDatePicker>(null);
  const [date, setDate] = useState(null);

  return (
    <Container style={containerStyle}>
      <ReactDatePicker
        ref={datepickerRef}
        dateFormat="MM/yyyy"
        startDate={new Date()}
        selected={date}
        onChange={setDate}
        showMonthYearPicker
        showFullMonthYearPicker
        inline
        {...rest}
      />
    </Container>
  );
};

export default MonthYearPicker;
