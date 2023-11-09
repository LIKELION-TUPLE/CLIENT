import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from '@src/styles/theme';
import { idProps } from 'pages/classbyday/detail/[id]';
import Header from 'components/common/Header';
import { classList } from 'data/dummy';
import { CheckedButtonIcon, UnCheckedButtonIcon, TrashIcon } from 'asset/index';
import Image from 'next/image';

interface colorProps {
  color: string;
}
const dummyHW = [
  { key: 1, text: '먕', isChecked: true },
  { key: 2, text: '먕먕', isChecked: false },
  { key: 3, text: '먕먕먕', isChecked: true },
];
const Detail = (props: idProps): JSX.Element | JSX.Element[] => {
  const { id } = props;
  console.log(id);
  const [checkList, setCheckList] = useState(dummyHW);

  // useEffect(() => {
  //   const
  //   dummyHW.forEach((hw) => {
  //     hw.isChecked;
  //   });
  //   setCheckList([]);
  // }, []);

  // const handleIsChecked = () => {
  //   setIsChecked(...isChecked);
  // };
  return (
    <ClassWrapper>
      <Header path={'calendar'} />
      <Title>수업일지</Title>
      {classList.map((student) => (
        <MainInfoSection>
          <StudentContainer>
            <ProfileBox color={student.color} />
            <ClassInfoBox>
              <SubInfo>{student.school}</SubInfo>
              <MainInfo>
                {student.name} 학생 | {student.subject}
              </MainInfo>
            </ClassInfoBox>
            <TurnInfoBox>{student.turn}</TurnInfoBox>
          </StudentContainer>
          <DateContainer>
            <DateBox>
              <DateTitle>날짜</DateTitle>
              <DateInput>{student.date}</DateInput>
            </DateBox>
            <TimeBox>
              <TimeTitle>시간</TimeTitle>
              <TimeInput>{student.time}</TimeInput>
            </TimeBox>
          </DateContainer>
          <PlaceContainer>
            <PlaceTitle>장소</PlaceTitle>
            <PlaceInput>{student.place}</PlaceInput>
          </PlaceContainer>
        </MainInfoSection>
      ))}
      <ClassInfoSection>
        <Container>
          <TitleContainer>
            <InfoTitle>오늘까지 숙제</InfoTitle>
            <UnderLine></UnderLine>
          </TitleContainer>
          {dummyHW.map((hw) => (
            <TodayHWContainer>
              <CheckButton>{hw.isChecked ? <CheckedButtonIcon /> : <UnCheckedButtonIcon />}</CheckButton>
              <Homework>{hw.text}</Homework>
              {/* <TrashIcon></TrashIcon> */}
            </TodayHWContainer>
          ))}
        </Container>
        <TitleContainer>
          <InfoTitle>오늘 나간 진도</InfoTitle>
          <UnderLine></UnderLine>
        </TitleContainer>
        <ProgressContainer>
          <ProgressInput placeholder="오늘의 진도를 입력해 주세요."></ProgressInput>
        </ProgressContainer>
        <NextHWContainer>
          <TitleContainer>
            <InfoTitle>다음 시간까지 숙제</InfoTitle>
            <UnderLine></UnderLine>
          </TitleContainer>
          <Homework>쎈 76-90p 풀기 </Homework>
          <Homework>모의고오사 풀기 </Homework>
        </NextHWContainer>
      </ClassInfoSection>
    </ClassWrapper>
  );
};

export default Detail;
const ClassWrapper = styled.div``;

const Title = styled.h1`
  margin-top: 7.3rem;
  margin-left: 3rem;
  ${theme.fonts.headline};
`;
const MainInfoSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 3rem;
  margin-left: 3.5rem;
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
const DateContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
`;
const DateBox = styled.div`
  display: flex;
  align-items: center;
  width: 14.5rem;
  height: 3.7rem;
  background-color: ${theme.colors.lightGray};
  border-radius: 1rem;
`;
const DateTitle = styled.p`
  margin-left: 1rem;
  margin-right: 1.4rem;
  ${theme.fonts.text01_medium}
`;
const DateInput = styled.p`
  ${theme.fonts.text02_regular}
`;
const TimeBox = styled.div`
  display: flex;
  align-items: center;
  width: 14.5rem;
  height: 3.7rem;
  background-color: ${theme.colors.lightGray};
  border-radius: 1rem;
`;
const TimeTitle = styled.p`
  margin-left: 1rem;
  margin-right: 1.4rem;
  ${theme.fonts.text01_medium}
`;
const TimeInput = styled.p`
  ${theme.fonts.text02_regular}
`;

const PlaceContainer = styled.div`
  display: flex;
  align-items: center;
  width: 30.5rem;
  height: 3.7rem;
  background-color: ${theme.colors.lightGray};
  border-radius: 1rem;
`;

const PlaceTitle = styled.p`
  margin-left: 1rem;
  margin-right: 1.4rem;
  ${theme.fonts.text01_medium}
`;
const PlaceInput = styled.p`
  ${theme.fonts.text02_regular}
`;
const ClassInfoSection = styled.section`
  width: 30.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 1rem;
  margin-left: 3.5rem;
  padding: 1.2rem;
  background-color: ${theme.colors.white};
  border-radius: 1.25rem;
`;
const Container = styled.div`
  margin-bottom: 4.6rem;
`;
const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.3rem;
`;
const InfoTitle = styled.h2`
  width: 100%;
  padding-left: 0.8rem;
  ${theme.fonts.text01_medium};
  margin-bottom: 0.2rem;
`;
const UnderLine = styled.div`
  width: 28rem;
  height: 0.05rem;
  margin-bottom: 1rem;
  background-color: ${theme.colors.darkGray};
`;
const TodayHWContainer = styled.div`
  height: 1.7rem;
  display: flex;
  align-items: center;
  margin-left: 0.8rem;
  /* margin-bottom: 4.6rem; */
`;
const CheckButton = styled.div``;
const Homework = styled.p`
  margin-left: 1.2rem;
  margin-bottom: 0.5rem;
  ${theme.fonts.text02_regular};
`;
const ProgressContainer = styled.div`
  width: 100%;
  min-height: 8rem;
  padding: 0.5rem 1.4rem;
  margin-bottom: 4.6rem;
  background-color: ${theme.colors.backgroundColor};
  ${theme.fonts.text02_regular};
  border-radius: 1rem;
`;
const ProgressInput = styled.input`
  width: 100%;
  background-color: ${theme.colors.backgroundColor};
  outline: none;
  border: none;
`;
const NextHWContainer = styled.div``;
