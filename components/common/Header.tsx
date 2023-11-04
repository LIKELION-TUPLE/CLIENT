import React from 'react';
import styled from 'styled-components';
import { LeftIcon } from 'asset';
const Header = () => {
  return (
    <HeaderWrapper>
      <LeftIcon alt="뒤로가기" width={27} height={27} />
    </HeaderWrapper>
  );
};

export default Header;
const HeaderWrapper = styled.div`
  position: fixed;
  top: 1.2rem;
  margin-left: 2.4rem;
  overflow-x: hidden;
  z-index: 3;
  cursor: pointer;
`;
