import styled from 'styled-components';

interface ContainerProps {
  optionChecked: string;
}

export const RadioGroup = styled.div``;

export const Container = styled.div<ContainerProps>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 0.5rem;

  height: 100%;
  min-height: 100%;
  margin: 0 auto;

  position: relative;
  text-align: center;

  input {
    position: absolute;
    left: -9999px;
    width: 0;
    height: 0;
    visibility: hidden;
  }

  label {
    width: 100%;
    display: inline-block;
    padding: 1em;
    cursor: pointer;
    color: #666360;
    border-radius: 10px;
    border: 2px solid #e6e6f0;
    background: #f8f8fc;

    transition: 0.3s;
    user-select: none;
  }

  input:checked + label {
    background: ${props => {
      if (props.optionChecked === 'income') {
        return '#12a454';
      }
      if (props.optionChecked === 'outcome') {
        return '#e83f5b';
      }
    }};
    color: #fff;
  }
`;
