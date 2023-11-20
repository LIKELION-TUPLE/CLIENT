import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from '@src/styles/theme';
import { TeacherBlackIcon, StudentBlackIcon } from 'asset';
import { useRouter } from 'next/router';
import Layout from '../common/Layout';
import Header from 'components/common/Header';

export interface HeaderProps {
  path?: string;
}

interface Props {
  isClick?: boolean;
  onClick?: () => void;
}

const SelectSignup = () => {
  const [clickedId, setClickedId] = useState<number>(-1);
  const router = useRouter();

  const handleSignup = () => {
    if (clickedId === 1) {
      router.replace('/signup/teacher');
    } else if (clickedId === 2) {
      router.replace('/signup/student');
    }
  };

  const handleClick = (index: number) => {
    setClickedId(index);
  };

  useEffect(() => {
    setClickedId(clickedId);
  }, [clickedId]);

  return (
    <Layout noFooter>
      <Header path={''} />
      <Page>
        <TitleWrapper>회원가입</TitleWrapper>
        <SelectWrapper>
          <SelectButton type="button" isClick={clickedId === 1} onClick={() => handleClick(1)}>
            <TeacherBlackIcon alt="선생님(선택x)" width={80} height={80} />
            <SelectContent>
              선생님으로
              <br />
              회원가입
            </SelectContent>
          </SelectButton>
          <SelectButton type="button" isClick={clickedId === 2} onClick={() => handleClick(2)}>
            <StudentBlackIcon alt="학생(선택x)" width={80} height={80} />
            <SelectContent>
              학생으로
              <br />
              회원가입
            </SelectContent>
          </SelectButton>
          <BottomButton type="submit" isClick={clickedId !== -1} onClick={handleSignup}>
            회원가입 하기
          </BottomButton>
        </SelectWrapper>
      </Page>
    </Layout>
  );
};

export default SelectSignup;

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

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 5.8rem;
`;

const SelectButton = styled.button<Props>`
  width: 18rem;
  height: 18rem;
  margin-bottom: 5.6rem;
  border-radius: 3rem;
  border: none;
  outline: none;
  background-color: ${({ isClick }) => (isClick ? theme.colors.mainColor : theme.colors.lightGray)};
  color: ${({ isClick }) => (isClick ? theme.colors.white : theme.colors.black)};

  cursor: pointer;
`;

const SelectContent = styled.h1`
  text-align: center;
  ${theme.fonts.title_medium};
`;

const BottomButton = styled.button<Props>`
  width: 30rem;
  height: 5rem;
  margin-top: 2.1rem;
  margin-bottom: 4.5rem;
  border-radius: 3rem;
  border: none;

  background-color: ${({ isClick }) => (isClick ? theme.colors.mainColor : theme.colors.lightGray)};
  color: ${theme.colors.white};
  ${theme.fonts.title_bold};

  cursor: pointer;
`;
