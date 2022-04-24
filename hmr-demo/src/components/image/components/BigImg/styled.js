
import styled from 'styled-components';
import { loading } from '../../styled';
import closeIcon from './asset/close.svg';
import arrowLeftIcon from './asset/arrow_left.svg';
import arrowRightIcon from './asset/arrow_right.svg';
import rotateLeft from './asset/rotate_reverse.svg';
import rotateRight from './asset/rotate_forward.svg';

export const BigImgBox = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;

  .loading{
    ${loading};
  }

  .operators{
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 1;

    a + a{
      margin-left: 10px;
    }

    .rotate-left, .rotate-right, .close{
      display: inline-block;
      width: 30px;
      height: 30px;
      background-size: 100%;
      background-position: center;
      opacity: .2;

      &:hover{
        opacity: .8;
      }
    }

    .rotate-left{
      background-image: url(${rotateLeft});
    }
    .rotate-right{
      background-image: url(${rotateRight});
    }
    .close{
      background-image: url(${closeIcon});
    }
  }



  .prevous, .next{
    position: fixed;
    top: 50%;
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 30px;
    border: solid 2px #333;
    background-position: center;
    background-size: 30px 30px;
    transform: translate(0, -50%);
    opacity: .2;

    &:hover{
      opacity: .8;
    }
  }
  .prevous{
    left: 5px;
    background-image: url(${arrowLeftIcon});
  }
  .next{
    right: 5px;
    background-image: url(${arrowRightIcon});
  }
`;
