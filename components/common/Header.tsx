import React from 'react';
import styled from 'styled-components';
import { LeftIcon } from 'asset';
import { useRouter } from 'next/router';
import { HeaderProps } from 'components/selectsignup/SelectSignup';

const Header: React.FC<HeaderProps> = ({ path }) => {
  const router = useRouter();
  const handleRouter = (path?: string) => {
    router.replace(`/${path}`);
  };
  return (
    <HeaderWrapper
      onClick={() => {
        handleRouter(path);
      }}>
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
