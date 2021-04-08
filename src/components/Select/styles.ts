import styled, { css } from 'styled-components';
import ReactSelect from 'react-select';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #f8f8fc;
  border-radius: 10px;
  padding: 11px;
  width: 100%;

  border: 2px solid #e6e6f0;
  color: #666360;

  display: flex;
  align-items: center;

  svg {
    margin-left: 8px;
    margin-right: 4px;
  }

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #8257e5;
      border-color: #8257e5;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}
  }
`;

export const CustomSelect = styled(ReactSelect)`
  flex: 1; /* ocupa a área toda */
  color: #6a6180;

  & .react-select__control {
    background: transparent;
    border: 0;
    box-shadow: none;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
