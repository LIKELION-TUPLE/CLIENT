import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
import Layout from './common/Layout';
import styled from 'styled-components';
import theme from '@src/styles/theme';

interface Props {
  isClick?: boolean;
}

const Login = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [notAllow, setNotAllow] = useState(true);

  const handleId = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const handlePw = (e: ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
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
      <Page>
        <TitleWrapper>회원 로그인</TitleWrapper>
        <ContentWrapper>
          <InputTitle>아이디</InputTitle>
          <InputWrapper>
            <Input type="text" placeholder="아이디를 입력해주세요" value={id} onChange={handleId}></Input>
          </InputWrapper>

          <InputTitle>비밀번호</InputTitle>
          <InputWrapper>
            <Input type="password" placeholder="비밀번호를 입력해주세요" value={pw} onChange={handlePw}></Input>
          </InputWrapper>
        </ContentWrapper>
        <BottomButton type="submit" isClick={notAllow}>
          로그인
        </BottomButton>
      </Page>
    </Layout>
  );
};

export default Login;

const Page = styled.div`
  top: 0;
  bottom: 0;
  width: 100%;
  max-width: 37.5rem;
  padding: 0 2rem;
  background-color: ${theme.colors.backgroundColor};
`;

const TitleWrapper = styled.div`
  margin-left: 1rem;
  margin-top: 7.2rem;
  font-size: 2.4rem;
  font-weight: 700;
`;

const ContentWrapper = styled.div`
  margin-top: 1.5rem;
  padding: 0.5rem 2rem 5rem 2rem;
  border-radius: 1rem;
  background-color: ${theme.colors.white};
`;

const InputTitle = styled.div`
  margin-top: 5rem;
  font-size: 1.5rem;
  font-weight: 500;
`;

const InputWrapper = styled.div`
  display: flex;
  padding-top: 1rem;
  border-bottom: 0.1rem solid ${theme.colors.black};
`;

const Input = styled.input`
  width: 100%;
  height: 1.4rem;
  border: none;
  outline: none;
  font-size: 1rem;
  font-weight: 400;
`;

const BottomButton = styled.button<Props>`
  margin: 2rem 0;
  width: 100%;
  height: 5rem;
  border-radius: 3rem;
  border: none;
  background-color: ${({ isClick }) => (isClick ? theme.colors.lightGray : theme.colors.mainColor)};
  color: ${theme.colors.white};
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;

  cursor: pointer;
`;
