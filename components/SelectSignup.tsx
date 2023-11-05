import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from '@src/styles/theme';
import { TeacherBlackIcon, StudentBlackIcon, TeacherWhiteIcon, StudentWhiteIcon } from 'asset';
import { useRouter } from 'next/router';
import Layout from './common/Layout';

interface Props {
  isClick?: boolean;
  onClick?: () => void;
}

const SelectSignup = () => {
  const [clickedId, setClickedId] = useState<number>(-1);
  const router = useRouter();

  const handleSignup = () => {
    if (clickedId === 1) {
      router.replace('/signup/선생님');
    } else if (clickedId === 2) {
      router.replace('singup/학생');
    }
  };
  const handleClick = (index: number) => {
    setClickedId(index);
  };

  useEffect(() => {
    setClickedId(clickedId);
  }, [clickedId]);

  return (
    <Layout noFooter={true}>
      <Page>
        <TitleWrapper>회원가입</TitleWrapper>
        <SelectWrapper>
          <SelectButton isClick={clickedId === 1} onClick={() => handleClick(1)}>
            {clickedId === 1 ? <TeacherWhiteIcon alt="선생님(선택o)" /> : <TeacherBlackIcon alt="선생님(선택x)" />}
            <SelectContent>
              선생님으로
              <br />
              회원가입
            </SelectContent>
          </SelectButton>
          <SelectButton isClick={clickedId === 2} onClick={() => handleClick(2)}>
            {clickedId === 2 ? <StudentWhiteIcon alt="학생(선택o)" /> : <StudentBlackIcon alt="학생(선택x)" />}
            <SelectContent>
              학생으로
              <br />
              회원가입
            </SelectContent>
          </SelectButton>
          <BottomButton isClick={clickedId !== -1} onClick={handleSignup}>
            회원가입 하기
          </BottomButton>
        </SelectWrapper>
      </Page>
    </Layout>
  );
};

export default SelectSignup;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  overflow: hidden;
  left: 50%;
  transform: translate(-50%, 0);

  top: 0;
  bottom: 0;
  width: 100%;
  max-width: 37.5rem;
  padding: 0 2rem;

  background-color: ${theme.colors.white};
`;

const TitleWrapper = styled.div`
  position: fixed;
  top: 7.2rem;
  margin-left: 1rem;

  font-size: 2.4rem;
  font-weight: 700;
`;

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100%;
`;

const SelectButton = styled.button<Props>`
  width: 22rem;
  height: 22rem;
  margin-bottom: 7rem;
  border-radius: 3rem;
  border: none;
  outline: none;
  text-align: center;
  background-color: ${({ isClick }) => (isClick ? theme.colors.mainColor : theme.colors.lightGray)};
  color: ${({ isClick }) => (isClick ? theme.colors.white : theme.colors.black)};

  font-size: 1.8rem;
  font-weight: 500;

  cursor: pointer;
`;

const SelectContent = styled.div``;

const BottomButton = styled.button<Props>`
  width: 100%;
  height: 5rem;
  border-radius: 3rem;
  border: none;

  background-color: ${({ isClick }) => (isClick ? theme.colors.mainColor : theme.colors.lightGray)};
  color: ${theme.colors.white};
  font-size: 1.8rem;
  font-weight: 700;

  cursor: pointer;
`;
