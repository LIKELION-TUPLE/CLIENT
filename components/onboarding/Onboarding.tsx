import React from 'react';
import styled from 'styled-components';
import Layout from '../common/Layout';
import theme from '@src/styles/theme';
import { OnboardingCalendarIcon, OnboardingClassListIcon, OnboardingMoneyIcon, KakaoIcon } from 'asset';
import { useRouter } from 'next/router';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Onboarding = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.replace('/login');
  };

  const handleSignup = () => {
    router.replace('/selectsignup');
  };

  return (
    <Layout noFooter>
      <Page>
        <SliderWrapper>
          <Carousel
            showStatus={false}
            showArrows={true}
            autoPlay={true}
            infiniteLoop={true}
            showThumbs={false}
            interval={2000}
            swipeable={true}
            emulateTouch={true}>
            <OnboardingCalendarIcon alt="달력온보딩" width={375} height={500} />
            <OnboardingClassListIcon alt="달력온보딩" width={375} height={500} />
            <OnboardingMoneyIcon alt="달력온보딩" width={375} height={500} />
          </Carousel>
        </SliderWrapper>

        <LoginWrapper>
          <KakaoLoginButton type="button">
            <KakaoIcon alt="카카오톡" width={28} height={26} />
            <KakaoLogin>카카오 간편 로그인</KakaoLogin>
          </KakaoLoginButton>
          <TupleLoginButton type="button" onClick={handleLogin}>
            회원 로그인
          </TupleLoginButton>
          <SignupWrapper>
            <SignupContent>아직 회원이 아니신가요?</SignupContent>
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
  max-width: 37.5rem;
`;

const SliderWrapper = styled.div`
  width: 37.5rem;
  overflow: hidden;
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 3.6rem;
`;

const KakaoLoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 26.8rem;
  padding: 1.2rem;
  border-radius: 3rem;

  background-color: ${theme.colors.kakao};

  cursor: pointer;
`;

const KakaoLogin = styled.div`
  padding-left: 1.4rem;
  ${theme.fonts.title_medium};
`;

const TupleLoginButton = styled.button`
  width: 100%;
  margin-top: 0.7rem;
  padding: 1.2rem;
  border-radius: 3rem;

  background-color: ${theme.colors.lightGray};

  ${theme.fonts.title_medium};

  cursor: pointer;
`;

const SignupWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 1.2rem;
`;

const SignupContent = styled.div`
  ${theme.fonts.text02_regular};
`;

const SignupButton = styled.button`
  padding-left: 0.2rem;

  ${theme.fonts.text02_bold};
  text-decoration: underline;

  cursor: pointer;
`;
