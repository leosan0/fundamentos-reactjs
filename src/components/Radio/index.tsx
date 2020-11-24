import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

export default function Radio({ name, options }) {
  const inputRefs = useRef([]);
  const { fieldName, registerField, defaultValue } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      path: 'value',
      ref: inputRefs.current,
      getValue(refs) {
        const checked = refs.find(ref => ref.checked);

        return checked ? checked.value : null;
      },
      setValue(refs, value) {
        const item = refs.find(ref => ref.value === value);

        if (item) {
          item.checked = true;
        }
      },
    });
  }, [fieldName, registerField]);

  return (
    <div>
      {options.map((option, index) => (
        <label key={option.id}>
          <input
            ref={elRef => (inputRefs.current[index] = elRef)}
            type="radio"
            name={fieldName}
            value={option.id}
            defaultChecked={defaultValue === option.id}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
}
