import React from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import Header from './Header';
import theme from '@src/styles/theme';

interface LayoutProps {
  noHeader?: boolean;
  children: React.ReactNode;
  noFooter?: boolean;
}

const Layout = (props: LayoutProps) => {
  const { children, noFooter, noHeader } = props;
  return (
    <LayoutWrapper>
      <ContentWrapper>
        {!noHeader && <Header />}
        {children}
        {!noFooter && <Footer />}
      </ContentWrapper>
    </LayoutWrapper>
  );
};

export default Layout;
const LayoutWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
`;
const ContentWrapper = styled.div`
  display: flex;

  flex-wrap: wrap;

  width: 37.5rem;
  height: 100%;
  min-height: 81.2rem;
  background: ${theme.colors.backgroundColor};
`;
