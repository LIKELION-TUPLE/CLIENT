import React from 'react';
import styled from 'styled-components';
import { CelebrateIcon } from 'asset';
import Layout from './common/Layout';
import theme from '@src/styles/theme';
import { useRouter } from 'next/router';

const CompleteSignup = () => {
  const router = useRouter();
  const handleLogin = () => {
    router.replace('/login');
  };

  return (
    <Layout noHeader noFooter>
      <Page>
        <CelebrateIcon alt="축하" />
        <TitleWrapper>가입이 완료되었습니다</TitleWrapper>
        <BottomButton type="button" onClick={handleLogin}>
          로그인 하기
        </BottomButton>
      </Page>
    </Layout>
  );
};

export default CompleteSignup;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 37.5rem;
  padding: 0 2rem;

  background-color: ${theme.colors.white};
`;

const TitleWrapper = styled.div`
  margin-top: 4.4rem;

  line-height: 3.5rem;
  font-size: 2.4rem;
  font-weight: 700;
`;

const BottomButton = styled.button`
  margin-top: 13.3rem;

  width: 100%;
  height: 5rem;
  border-radius: 3rem;
  border: none;

  background-color: ${theme.colors.mainColor};
  color: ${theme.colors.white};
  font-size: 1.8rem;
  font-weight: 700;

  cursor: pointer;
`;
