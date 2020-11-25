import styled, { css } from 'styled-components';

export const Container = styled.div`
  /* background: #f8f8fc;
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  border: 2px solid #e6e6f0;
  color: #666360;

  display: flex;
  align-items: center; */

  height: 100%;
  min-height: 100%;
  margin: 0 auto;

  position: relative;
  text-align: center;

  input {
    //display: none;
    height: 100%
    width: 100%;
  }

  label {
    display: inline-block;
    padding: 1em 5.6em;
    cursor: pointer;
    color: #666360;
    border-radius: 10px;
    border: 2px solid #e6e6f0;
    background: #f8f8fc;
    /* box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2),
      inset 0 -3px 0 rgba(0, 0, 0, 0.22); */
    transition: 0.3s;
    user-select: none;
  }

  label + label {
    margin-left: 0.5em;
  }
`;
