import React, { useState } from 'react';
import styled from 'styled-components';
import Layout from './common/Layout';
import theme from '@src/styles/theme';
import { OnboardingCalendarIcon, OnboardingClassListIcon, OnboardingMoneyIcon, KakaoIcon } from 'asset';
import { useRouter } from 'next/router';

const Onboarding = () => {
  const [idx, setIdx] = useState(1);
  const router = useRouter();

  const handleClick = (n: number) => {
    if (n === 1 && idx !== 3) {
      setIdx(idx + 1);
    }
    if (n === -1 && idx !== 1) {
      setIdx(idx - 1);
    }
  };

  const handleLogin = () => {
    router.replace('/login');
  };

  const handleSignup = () => {
    router.replace('/selectsignup');
  };

  return (
    <Layout noHeader noFooter>
      <Page>
        {idx === 1 ? (
          <OnboardingWrapper>
            <OnboardingCalendarIcon alt="달력온보딩" width={375} height={470} />
            <OnboardingContent>
              과외 일정을
              <br />한 눈에 확인하세요
            </OnboardingContent>
          </OnboardingWrapper>
        ) : idx === 2 ? (
          <OnboardingWrapper>
            <OnboardingClassListIcon alt="달력온보딩" width={375} height={470} />
            <OnboardingContent>
              진행한 과외 내용을
              <br />
              간편하게 기록하세요
            </OnboardingContent>
          </OnboardingWrapper>
        ) : (
          <OnboardingWrapper>
            <OnboardingMoneyIcon alt="달력온보딩" width={375} height={470} />
            <OnboardingContent>
              과외비 입급 여부를
              <br />
              체계적으로 관리하세요
            </OnboardingContent>
          </OnboardingWrapper>
        )}

        <ButtonWrapper>
          <ScrollButton type="button" onClick={() => handleClick(-1)}>
            이전
          </ScrollButton>
          <ScrollButton type="button" onClick={() => handleClick(1)}>
            다음
          </ScrollButton>
        </ButtonWrapper>
        <LoginWrapper>
          <KakaoLoginButton type="button">
            <KakaoIcon alt="카카오톡" width={28} height={26} />
            <KakaoLogin>카카오 간편 로그인</KakaoLogin>
          </KakaoLoginButton>
          <TupleLoginButton type="button" onClick={handleLogin}>
            회원 로그인
          </TupleLoginButton>
          <SignupWrapper>
            <SignupContent>아직 회원이 아니신가요? </SignupContent>
            <SignupButton type="button" onClick={handleSignup}>
              회원가입 하러가기
            </SignupButton>
          </SignupWrapper>
        </LoginWrapper>
      </Page>
    </Layout>
  );
};

export default Onboarding;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  width: 100%;
  max-width: 37.5rem;
  padding: 0 2rem;
`;

const OnboardingWrapper = styled.div``;

const OnboardingContent = styled.h1`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  line-height: normal;
`;

const ButtonWrapper = styled.div`
  margin-top: 1.8rem;
`;

const ScrollButton = styled.button``;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 3.6rem;
  width: 26.8rem;
`;

const KakaoLoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 1.2rem;
  border-radius: 3rem;

  background-color: ${theme.colors.kakao};

  cursor: pointer;
`;

const KakaoLogin = styled.div`
  padding-left: 1.4rem;
  font-size: 1.8rem;
  font-weight: 500;
`;

const TupleLoginButton = styled.button`
  width: 100%;
  margin-top: 0.7rem;
  padding: 1.2rem;
  border-radius: 3rem;

  background-color: ${theme.colors.lightGray};

  font-size: 1.8rem;
  font-weight: 500;

  cursor: pointer;
`;

const SignupWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 1.2rem;
`;

const SignupContent = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
`;

const SignupButton = styled.button`
  font-size: 1.2rem;
  font-weight: 700;
  text-decoration: underline;

  cursor: pointer;
`;
