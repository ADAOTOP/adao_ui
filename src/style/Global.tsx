import { createGlobalStyle } from 'styled-components';
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from '@my/ui/dist/theme';
declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

export const HomeGlobalStyled = createGlobalStyle`
html {
  height: 100%;
}

body {
  height: 100%;
  background-color: #060608;
  background-image: url('/images/iamge_banner.webp');
  background-size: 1054px;
  background-repeat: no-repeat;
  background-position: center -60px;
}
`;
const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'GothamLight';
  src: url('/fonts/GothamBold.otf');
}
@font-face {
  font-family: 'GothamMedium';
  src: url('/fonts/GothamMedium.otf');
}
@font-face {
  font-family: 'Gotham';
  src: url('/fonts/GothamBlack.otf');
}

body {
  background-color: #060608;
}
img {
  height: auto;
  max-width: 100%;
}
#root {
  display: flex;
  flex-direction: column;
}
h1,
{
  color: #fff;
  font-family: 'Gotham';
}
h2,
h3,h4,h5,h6 {
  color: #fff;
  font-family: 'GothamMedium';
}
p, ul, li,i {
  font-family: 'GothamLight';
  // font-family: Kanit, sans-serif;
}
p {
  font-weight: 400;
  font-size: 14px;
  color: #91919e;
  line-height: 26px;
}
`;

export default GlobalStyle;
