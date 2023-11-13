import React, { ChangeEvent, useEffect, useState } from 'react';
import Layout from '../common/Layout';
import styled from 'styled-components';
import theme from '@src/styles/theme';
import Header from 'components/common/Header';
import { useRouter } from 'next/router';

interface Props {
  isClick?: boolean;
}

const AddTutoring = () => {
  const [code, setCode] = useState('');
  const [notAllow, setNotAllow] = useState(true);
  const router = useRouter();

  const handleCode = (e: ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const handleClick = () => {
    if (!notAllow) {
      alert('과외가 추가되었습니다');
    }
  };

  useEffect(() => {
    if (code.length == 10) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [code]);

  return (
    <Layout noFooter>
      <Header />
      <Page>
        <TitleWrapper>과외 추가</TitleWrapper>
        <InputCodeWrapper>
          <InputTitle>선생님의 코드를 입력하세요</InputTitle>
          <Input type="input" placeholder="10자리 입력" value={code} onChange={handleCode}></Input>
        </InputCodeWrapper>
        <ButtonWrapper>
          <BottomButton type="submit" isClick={notAllow} onClick={handleClick}>
            저장
          </BottomButton>
        </ButtonWrapper>
      </Page>
    </Layout>
  );
};

export default AddTutoring;

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

const InputCodeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 18rem;
`;

const InputTitle = styled.div`
  ${theme.fonts.title_bold}
`;

const Input = styled.input`
  margin-top: 2rem;
  padding: 1rem 5.4rem;
  border-radius: 1rem;
  border: none;
  outline: none;
  width: 19.4rem;
  height: 3.6rem;
  background-color: ${theme.colors.lightGray};
  ${theme.fonts.text01_medium}
`;

const ButtonWrapper = styled.div`
  margin-top: 17.6rem;
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
