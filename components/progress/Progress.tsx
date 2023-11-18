import React, { useState } from 'react';
import { idProps } from 'pages/classbyday/detail/[id]';
import styled from 'styled-components';
import theme from '@src/styles/theme';
import Header from 'components/common/Header';
import { LeftSmallIcon, RightSmallIcon } from 'asset';
interface colorProps {
  color: string;
}
const dummy = [
  { time: '1월 1일 (7회차)', class: '수2 행렬의 곱셈까지 나감' },
  { time: '1월 8일 (8회차)', class: '수2 행렬 전체 나감' },
  { time: '1월 15일 (9회차)', class: '수2 벡터 나감' },
];

const Progress = (props: idProps) => {
  const { id } = props;
  const [month, setMonth] = useState(10);
  const [year, setYear] = useState(2023);
  const handleLeftClick = () => {
    if (month > 1) {
      setMonth(month - 1);
    } else {
      setYear(year - 1);
      setMonth(12);
    }
  };
  const handleRightClick = () => {
    if (month < 12) {
      setMonth(month + 1);
    } else {
      setYear(year + 1);
      setMonth(1);
    }
  };
  return (
    <ClassWrapper>
      <Header path={'classlist'} />
      <Title>수업 일지</Title>
      <ClassSection>
        <StudentContainer>
          <ProfileBox color={'#FFAFA3'} />
          <ClassInfoBox>
            <SubInfo>서강고 2학년</SubInfo>
            <MainInfo>김기철 학생 | 수학</MainInfo>
          </ClassInfoBox>
          <TurnInfoBox>1회차</TurnInfoBox>
        </StudentContainer>
      </ClassSection>
      <ProgressSection>
        <DateContainer>
          <LeftSmallIcon onClick={handleLeftClick}></LeftSmallIcon>
          <Date>
            {year}년 {month}월
          </Date>
          <RightSmallIcon onClick={handleRightClick}></RightSmallIcon>
        </DateContainer>
        <SubTitle>과외 기록</SubTitle>

        <ProgressContainer>
          <ProgressBar>
            {Array(dummy.length - 1).fill(
              <div>
                <ProgressDone />
                <ProgressBarLine />
              </div>,
            )}
            <ProgressNow />
          </ProgressBar>
          <ProgressBox>
            {dummy.map((data) => (
              <ProgressText>
                <ProgressMain>{data.time}</ProgressMain>
                <ProgressSub>{data.class}</ProgressSub>
              </ProgressText>
            ))}
          </ProgressBox>
        </ProgressContainer>
      </ProgressSection>
    </ClassWrapper>
  );
};

export default Progress;
const Title = styled.h1`
  margin-top: 7.3rem;
  margin-left: 3rem;
  ${theme.fonts.headline};
`;
const ClassWrapper = styled.div``;
const ClassSection = styled.section`
  width: 33.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 3rem;
  margin-left: 2rem;
  padding: 0rem 1.5rem;
  border-radius: 1.25rem;
`;
const StudentContainer = styled.div`
  display: flex;
  align-items: center;
  width: 30.5rem;
  height: 7.5rem;
  margin-bottom: 0.9rem;
  padding: 1.1rem 1.5rem;
  background-color: ${theme.colors.lightGray};
  border-radius: 1rem;
`;
const ProfileBox = styled.div<colorProps>`
  width: 4rem;
  height: 4rem;
  margin-right: 1.8rem;
  border-radius: 10rem;
  background-color: ${(props) => props.color};
`;
const ClassInfoBox = styled.div`
  width: 18rem;
`;
const TurnInfoBox = styled.div`
  ${theme.fonts.text01_regular}
`;
const SubInfo = styled.div`
  ${theme.fonts.text02_regular};
  color: ${theme.colors.black};
`;
const MainInfo = styled.div`
  ${theme.fonts.text01_medium};
`;
const ProgressSection = styled.section`
  margin: 0rem 2.1rem;
`;
const DateContainer = styled.div`
  margin-top: 2.7rem;
  margin-left: 0.9rem;
`;
const Date = styled.span`
  margin: 0rem 1.6rem;
  ${theme.fonts.text02_regular}
`;
const SubTitle = styled.h3`
  margin-top: 1.4rem;
  margin-left: 1.6rem;
  ${theme.fonts.subheadline}
`;
const ProgressContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 0.7rem;
  padding: 3.8rem 3.4rem;
  width: 33.5rem;

  border-radius: 1rem;
  background-color: ${theme.colors.white};
`;
const ProgressBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;
const ProgressBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1.4rem;
  margin-right: 0.9rem;
  margin-top: 0.4rem;
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 1.4rem;
    margin-right: 0.9rem;
  }
`;
const ProgressBarLine = styled.div`
  /* margin-left: 0.35rem; */
  width: 0.3rem;
  height: 5.6rem;
  background-color: ${theme.colors.mainColor};
`;
const ProgressDone = styled.div`
  width: 1.1rem;
  height: 1.1rem;
  border-radius: 4rem;
  background-color: ${theme.colors.mainColor};
`;
const ProgressNow = styled.div`
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 4rem;
  border: 0.25rem ${theme.colors.mainColor} solid;
  background-color: ${theme.colors.lightGray};
`;
const ProgressText = styled.div`
  margin-top: -0.2rem;
`;
const ProgressMain = styled.h3`
  ${theme.fonts.text01_medium};
`;
const ProgressSub = styled.span`
  ${theme.fonts.text02_regular};
`;