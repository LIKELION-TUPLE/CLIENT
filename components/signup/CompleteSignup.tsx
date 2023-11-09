import React from 'react';
import styled from 'styled-components';
import { CelebrateIcon } from 'asset';
import Layout from '../common/Layout';
import theme from '@src/styles/theme';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { userName, userType } from 'atoms/atom';

const CompleteSignup = () => {
  const name = useRecoilValue(userName);
  const type = useRecoilValue(userType);
  const router = useRouter();
  const handleLogin = () => {
    router.replace('/login');
  };

  return (
    <Layout noFooter>
      <Page>
        <CelebrateIcon alt="축하" style={{ marginTop: `18.5rem` }} />
        <TitleWrapper>
          {name} {type}
          <br />
          가입이 완료되었습니다
        </TitleWrapper>
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
  align-items: center;
  width: 100%;
  max-width: 37.5rem;

  background-color: ${theme.colors.backgroundColor};
`;

const TitleWrapper = styled.div`
  margin-top: 4.4rem;

  text-align: center;
  ${theme.fonts.headline};
`;

const BottomButton = styled.button`
  margin-top: 13.3rem;
  margin-bottom: 4.5rem;

  width: 30rem;
  height: 5rem;
  border-radius: 3rem;
  border: none;

  background-color: ${theme.colors.mainColor};
  color: ${theme.colors.white};
  ${theme.fonts.title_bold};

  cursor: pointer;
`;
