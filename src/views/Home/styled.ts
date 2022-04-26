import styled from 'styled-components';
export const HomeStyled = styled.div`
  .banner {
    text-align: center;
  }
  .banner .h1 {
    display: inline-block;
    max-width: 1000px;
    padding-bottom: 50px;
    background-image: url(/images/iamge_csfgx.webp);
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: bottom center;
    position: relative;
    z-index: 9;
  }
  .banner h1 {
    padding-top: 180px;
    padding-bottom: 30px;
    font-size: 68px;
    font-weight: 600;
    line-height: 80px;
    color: transparent;

    background: linear-gradient(90deg, #303fff 0%, #c947d9 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .banner p {
    display: inline-block;
    max-width: 820px;
    padding-top: 40px;
    padding-bottom: 104px;
    position: relative;
    z-index: 9;
  }
  .list ul,
  .list ul li {
    list-style: none;
  }
  .list ul {
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding-bottom: 120px;
    position: relative;
    z-index: 9;
    margin: 0 20px;
    ${({ theme }) => theme.mediaQueries.xl} {
      margin: 0 auto;
      padding-bottom: 180px;
    }
  }
  .list ul li {
    width: 300px;
    border-radius: 12px;
    border: 1px solid transparent;
    position: relative;
    box-shadow: 0 0 7px #000;
    overflow: hidden;
    padding: 1px;
    transform: scale(1);
    transition: all 0.3s ease;
  }
  .list ul li:hover {
    transform: scale(1.04);
  }
  .list ul li .border-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, #c947d9, #303fff);
    opacity: 0.7;
    transition: all 0.3s ease;
    box-shadow: 0 0 4px #000 inset;
    opacity: 0;
  }
  .list ul li:hover .border-bg {
    box-shadow: none;
    opacity: 1;
  }
  .list ul li p {
    transition: all 0.3s ease;
    font-weight: 500;
  }
  .list ul li:hover p {
    color: rgba(255, 255, 255, 0.8);
  }
  .list ul li .border-inner {
    border-radius: 12px;
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    padding: 30px 40px 120px;
    min-height: 418px;
    background: linear-gradient(0deg, #0d0d11, #3a3a4c);
  }
  .list ul li h2 {
    font-size: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    transition: all 0.3s ease;
    // background: linear-gradient(90deg, #ff13c8 0%, #128aff 50%, #ff13c8 100%);
    // -webkit-background-clip: text;
    // color: transparent;
  }
  .list ul li .img {
    position: absolute;
    bottom: 40px;
    width: 60px;
    height: 40px;
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
  }
  .list ul li img {
    position: absolute;
    bottom: 40px;
    width: 60px;
    height: 60px;
  }
  .list ul li:nth-child(1) .img {
    background-image: url(/images/icon_rewards_hover.webp);
  }
  .list ul li:nth-child(2) .img {
    background-image: url(/images/icon_Treasuury_hover.webp);
  }
  .list ul li:nth-child(3) .img {
    background-image: url(/images/iocn_Bonus_hover.webp);
  }

  .list ul li:hover:nth-child(1) .img {
    background-image: url(/images/icon_rewards_hover.webp);
  }
  .list ul li:hover:nth-child(2) .img {
    background-image: url(/images/icon_Treasuury_hover.webp);
  }
  .list ul li:hover:nth-child(3) .img {
    background-image: url(/images/iocn_Bonus_hover.webp);
  }
  .part_two {
    border-top: 1px solid #39393c;
    border-bottom: 1px solid #39393c;
    padding: 0 20px;
    ${({ theme }) => theme.mediaQueries.xl} {
      padding: 0;
    }
  }
  .part_two .inner {
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .part_two .inner h3 {
    font-size: 24px;
    line-height: 34px;
    padding-right: 180px;
  }
  .part_two .inner .fr {
    width: 260px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: -50px;
  }
  .part_two .inner .fr i {
    display: inline-block;
    width: 1px;
    height: 148px;
    position: relative;
    background-color: #39393c;
  }
  .part_two .inner .fr i.fr_last {
    margin-top: 100px;
  }
  .part_two .inner img {
    margin-top: 50px;
    display: inline-block;
    width: 149px;
  }
  .footer {
    padding-top: 120px;
    padding-bottom: 100px;
    text-align: center;
  }
  .footer ul {
    display: inline-block;
  }
  .footer ul li {
    display: inline-block;
    padding: 20px 16px;
  }
  .footer ul li a {
    display: block;
  }
  .footer ul li img {
    display: block;
    width: 26px;
    height: 26px;
    transition: all 0.3s ease;
  }
  .footer ul li:hover img {
    opacity: 0.7;
  }
  @media screen and (max-width: 740px) {
    body {
      background-size: 200%;
    }
    .banner h1 {
      font-size: 40px;
      line-height: 50px;
    }
    .banner .h1 {
      max-width: 90%;
    }
    .banner h1 {
      padding-top: 120px;
    }
    .banner p {
      max-width: 90%;
      padding-top: 60px;
      padding-bottom: 100px;
    }
    .list ul {
      // width: 80%;
      margin: 0 20px;
      flex-direction: column;
      padding-bottom: 80px;
    }
    .list ul li {
      width: 100%;
      min-height: auto;
      margin-bottom: 20px;
      clear: both;
    }
    .list ul li:hover {
      transform: scale(1);
    }
    .list ul li .border-inner {
      padding: 10px 20px 20px;
      min-height: auto;
    }
    .list ul li p {
      padding-bottom: 10px;
    }
    .list ul li .img {
      position: relative;
      bottom: 0;
      float: right;
    }
    .list ul li img {
      position: relative;
      bottom: 0;
    }
    .part_two .inner h3 {
      font-size: 18px;
      line-height: 28px;
      padding-right: 30px;
    }
    .part_two .inner .fr i {
      width: 3px;
    }
    .part_two .inner {
      max-width: 90%;
    }
    .footer {
      padding-top: 50px;
    }
  }
`;
