import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  InputHTMLAttributes,
} from 'react';
import { useField } from '@unform/core';

import { Container, RadioGroup } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  options: {
    id: string;
    value: string;
    label: string;
  }[];
}

const Radio: React.FC<InputProps> = ({ name, options }) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const { fieldName, registerField, defaultValue } = useField(name);
  const [optionChecked, setOptionChecked] = useState('income');

  const handleCheck = useCallback(() => {
    const checked = inputRefs.current.find(ref => ref.checked);

    setOptionChecked(checked.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      // path: 'value',
      ref: inputRefs.current,
      getValue: (refs: HTMLInputElement[]) => {
        const checked = refs.find(ref => ref.checked);

        return checked ? checked.value : null;
      },
      setValue: (refs: HTMLInputElement[], value: string) => {
        const item = refs.find(ref => ref.value === value);

        if (item) {
          item.checked = true;
        }
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container optionChecked={optionChecked}>
      {options.map((option, index) => (
        <RadioGroup key={option.id}>
          <input
            id={option.id}
            ref={ref => {
              inputRefs.current[index] = ref as HTMLInputElement;
            }}
            type="radio"
            name={fieldName}
            value={option.id}
            defaultChecked={defaultValue === option.id}
            onChange={handleCheck}
          />
          <label htmlFor={option.id}>{option.label}</label>
        </RadioGroup>
      ))}
    </Container>
  );
};

export default Radio;
