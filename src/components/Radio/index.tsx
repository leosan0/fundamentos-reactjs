import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  InputHTMLAttributes,
} from 'react';
import { useField } from '@unform/core';

import { Container } from './styles';

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
  const [isChecked, setIsChecked] = useState(false);

  const handleLabelClick = useCallback(() => {
    setIsChecked(!isChecked);
  }, [isChecked]);

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
    <Container>
      {options.map((option, index) => (
        <label htmlFor={option.id} key={option.id}>
          <input
            ref={ref => {
              inputRefs.current[index] = ref as HTMLInputElement;
            }}
            type="radio"
            name={fieldName}
            value={option.id}
            checked={isChecked}
            defaultChecked={defaultValue === option.id}
          />
          {/* <span>{option.label}</span> */}
          {option.label}
        </label>
      ))}
    </Container>
  );
};

export default Radio;
