import styled from 'styled-components';
import { shade } from 'polished';
import { Form as Unform } from '@unform/web';

export const Form = styled(Unform)`
  padding: 48px 40px;

  margin: 30px 0;
  width: 100%;
  text-align: center;

  h1 {
    margin-bottom: 24px;
    color: #363f5f;
    font-weight: 500;
    font-size: 36px;
    line-height: 54px;
  }

  a {
    color: #f4edef;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#f4edef')};
    }
  }
`;
