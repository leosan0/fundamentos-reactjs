import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {}

export const Container = styled.div<ContainerProps>`
  background: #f8f8fc;
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  border: 2px solid #e6e6f0;
  color: #666360;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  .react-datepicker-wrapper,
  .react-datepicker__input-container,
  input {
    display: flex;
    flex: 1; /* ocupa a área toda */
    background: transparent;
    border: 0;
    color: #6a6180;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;
