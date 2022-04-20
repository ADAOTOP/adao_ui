import React from 'react';
import styled, { keyframes } from 'styled-components';

const floatingAnim = (x: string, y: string) => keyframes`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(${x}, ${y});
  }
  to {
    transform: translate(0, 0px);
  }
`;
const AnimationStyled = styled.div`
  position: absolute;
  width: 100%;
  .img_a {
    animation: ${floatingAnim('3px', '15px')} 3s ease-in-out infinite;
    width: 29px;
    position: absolute;
    top: 120px;
    right: 20%;
  }
  .img_b {
    width: 19px;
    position: absolute;
    top: 150px;
    right: 18%;
    animation: ${floatingAnim('5px', '10px')} 3s ease-in-out infinite;
    animation-delay: 0.66s;
  }
  .img_c {
    animation: ${floatingAnim('3px', '15px')} 3s ease-in-out infinite;
    width: 18px;
    position: absolute;
    top: 320px;
    right: 5%;
  }
  .img_d {
    width: 22px;
    position: absolute;
    top: 320px;
    right: 2%;
    animation: ${floatingAnim('5px', '10px')} 3s ease-in-out infinite;
    animation-delay: 0.66s;
  }

  .img_e {
    width: 26px;
    position: absolute;
    top: 560px;
    left: 10%;
    animation: ${floatingAnim('5px', '10px')} 3s ease-in-out infinite;
    // animation-delay: 0.66s;
  }
  .img_f {
    width: 22px;
    position: absolute;
    top: 720px;
    left: 5%;
    animation: ${floatingAnim('5px', '10px')} 3s ease-in-out infinite;
    // animation-delay: 0.66s;
  }
  .img_g {
    width: 48px;
    position: absolute;
    top: 1020px;
    right: 10%;
    animation: ${floatingAnim('5px', '10px')} 3s ease-in-out infinite;
    // animation-delay: 0.66s;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    .img_a {
      width: 49px;
      top: 220px;
      right: 20%;
    }
    .img_b {
      width: 29px;
      top: 260px;
      right: 18%;
    }
    .img_c {
      width: 28px;
      top: 430px;
      right: 7%;
    }
    .img_d {
      width: 48px;
      top: 420px;
      right: 5%;
    }
    .img_e {
      width: 36px;
      top: 220px;
      left: 15%;
    }
    .img_f {
      width: 22px;
      top: 720px;
      left: 10%;
    }
  }
`;
const Animation = () => {
  return (
    <AnimationStyled>
      {['a', 'b', 'c', 'd', 'e', 'f', 'g'].map((v: string) => {
        return (
          <div className={`img_${v}`} key={v}>
            <img src={`/images/Image_${v}.webp`} alt="" />
          </div>
        );
      })}
    </AnimationStyled>
  );
};
export default Animation;
