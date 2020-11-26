import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  /* height: 100vh;
  display: flex;
  display: flex;
  align-items: stretch;
  */
  height: 70vh;
  background: #ffffff;
  width: 100%;
  max-width: 40rem;
  border-radius: 0.8rem;
  margin: -3.2rem auto 3.2rem;
  padding-top: 1.4rem;
`;

export const Content = styled.div`
  align-items: center;
  place-content: center;

  width: 100%;
  max-width: 700px;
`;

export const Inputs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 1.6rem;
`;

export const RadioGroup = styled.div`
  color: #666360;

  input {
    margin-left: 4px;
  }

  label {
    margin-left: 4px;
  }
`;

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;

  align-items: center;

  place-content: center;

  animation: ${appearFromRight} 1s;

  form {
    margin: 30px 0;
    width: 80%;
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
  }

  > a {
    color: #F4EDE8;
    /* display: block; */
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#F4EDE8')};
  }
`;

export const Background = styled.div`
  flex: 1;
  background-size: cover;
`;