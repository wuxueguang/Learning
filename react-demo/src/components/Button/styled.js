
import styled from 'styled-components';

export const Button = styled.button`
    line-height: 1.499;
    position: relative;
    display: inline-block;
    font-weight: 400;
    white-space: nowrap;
    text-align: center;
    background-image: none;
    border: 1px solid transparent;
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    user-select: none;
    touch-action: manipulation;
    height: 32px;
    padding: 0 15px;
    font-size: 12px;
    border-radius: 4px;
    color: rgba(0, 0, 0, 0.6);
    background-color: #fff;
    border-color: #dedede;

    &[type=primary]{
      color: #fff;
      background-color: #0170fe;
    }
`;