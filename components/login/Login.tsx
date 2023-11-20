import React, { ChangeEvent, useEffect, useState } from 'react';
import Layout from '../common/Layout';
import styled from 'styled-components';
import theme from '@src/styles/theme';
import Header from 'components/common/Header';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { userTokenSave } from 'atoms/selector';

interface Props {
  isClick?: boolean;
}

const Login = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [notAllow, setNotAllow] = useState(true);
  const router = useRouter();
  const setUserToken = useSetRecoilState(userTokenSave);

  const handleId = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const handlePw = (e: ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
  };

  const handleLogin = async () => {
    if (!notAllow) {
      try {
        const URL = `https://port-0-server-3szcb0g2blp3xl01q.sel5.cloudtype.app/login`;
        const response = await axios.post(URL, {
          loginId: id,
          password: pw,
        });
        setUserToken(response.data.token);
        alert('로그인에 성공했습니다');
        router.replace('/calendar');
      } catch (error) {
        alert('등록되지 않은 아이디이거나 비밀번호를 잘못 입력했습니다');
        setId('');
        setPw('');
        setNotAllow(true);
      }
    }
  };

  useEffect(() => {
    if (id.length > 0 && pw.length > 0) {
      setNotAllow(false);
      return;
    } else {
      setNotAllow(true);
    }
  }, [id, pw]);

  return (
    <Layout noFooter>
      <Header path="" />
      <Page>
        <TitleWrapper>회원 로그인</TitleWrapper>
        <ContentWrapper>
          <ContentContainer>
            <InputTitle>아이디</InputTitle>
            <InputWrapper>
              <Input type="text" placeholder="아이디를 입력해주세요" value={id} onChange={handleId}></Input>
            </InputWrapper>
          </ContentContainer>

          <ContentContainer>
            <InputTitle>비밀번호</InputTitle>
            <InputWrapper>
              <Input type="password" placeholder="비밀번호를 입력해주세요" value={pw} onChange={handlePw}></Input>
            </InputWrapper>
          </ContentContainer>
        </ContentWrapper>
        <ButtonWrapper>
          <BottomButton type="submit" isClick={notAllow} onClick={handleLogin}>
            로그인
          </BottomButton>
        </ButtonWrapper>
      </Page>
    </Layout>
  );
};

export default Login;

const Page = styled.div`
  width: 100%;
  max-width: 37.5rem;
  padding: 0 2rem;

  background-color: ${theme.colors.backgroundColor};
`;

const TitleWrapper = styled.div`
  margin-top: 8.3rem;
  margin-left: 1rem;
  ${theme.fonts.headline};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3.8rem;

  margin-top: 1.5rem;
  padding: 3rem 2rem;
  border-radius: 1rem;

  background-color: ${theme.colors.white};
`;

const ContentContainer = styled.div``;

const InputTitle = styled.div`
  ${theme.fonts.text01_medium};
`;

const InputWrapper = styled.div`
  padding-top: 0.6rem;
  padding-bottom: 0.2rem;
  border-bottom: 0.1rem solid ${theme.colors.black};
`;

const Input = styled.input`
  width: 100%;
  height: 1.4rem;
  border: none;
  outline: none;

  ${theme.fonts.text03_regular};

  &::placeholder {
    color: ${theme.colors.gray};
    ${theme.fonts.text03_regular};
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BottomButton = styled.button<Props>`
  margin-top: 2rem;
  margin-bottom: 4.5rem;

  width: 30rem;
  height: 5rem;
  border-radius: 3rem;
  border: none;

  background-color: ${({ isClick }) => (isClick ? theme.colors.lightGray : theme.colors.mainColor)};
  color: ${theme.colors.white};
  ${theme.fonts.title_bold};

  cursor: pointer;
`;
