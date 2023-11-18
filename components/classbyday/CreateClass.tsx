import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { classList } from 'data/dummy';
import theme from '@src/styles/theme';
import Header from 'components/common/Header';
import { PlusIcon } from 'asset/index';

interface colorProps {
  color: string;
}
const CreateClass = () => {
  const [nextHW, setNextHW] = useState<any[]>([]);
  const [nextHWContent, setNextHWContent] = useState<string[]>([]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [place, setPlace] = useState('');
  const [progress, setProgress] = useState('');
  const handleNextHW = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNextHWContent([...nextHWContent, e.target.value]);
  };
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };
  const handlePlaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlace(e.target.value);
  };
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgress(e.target.value);
  };
  const handlePlusOnClick = () => {
    setNextHW(
      nextHW.concat(
        <NextHWInputContainer>
          -
          <NextHWInput
            placeholder="숙제를 입력해주세요"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleNextHW(e)}
          />
        </NextHWInputContainer>,
      ),
    );
  };
  useEffect(() => {
    console.log(nextHWContent);
  }, [nextHWContent]);
  return (
    <ClassWrapper>
      <Header path={'calendar'} />
      <Title>수업일지</Title>
      <MainInfoSection>
        {classList.map((student) => (
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
        ))}
        <DateContainer>
          <DateBox>
            <DateTitle>날짜</DateTitle>
            <DateInput
              type="date"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDateChange(e)}></DateInput>
          </DateBox>
          <TimeBox>
            <TimeTitle>시간</TimeTitle>
            <TimeInput
              type="time"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTimeChange(e)}></TimeInput>
          </TimeBox>
        </DateContainer>
        <PlaceContainer>
          <PlaceTitle>장소</PlaceTitle>
          <PlaceInput onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePlaceChange(e)}></PlaceInput>
        </PlaceContainer>
      </MainInfoSection>
      <ClassInfoSection>
        <TitleContainer>
          <InfoTitle>오늘까지 숙제</InfoTitle>
          <UnderLine></UnderLine>
        </TitleContainer>
        <TodayHWContainer></TodayHWContainer>
        <TitleContainer>
          <InfoTitle>오늘 나간 진도</InfoTitle>
          <UnderLine></UnderLine>
        </TitleContainer>
        <ProgressContainer>
          <ProgressInput
            placeholder="오늘의 진도를 입력해 주세요."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleProgressChange(e)}></ProgressInput>
        </ProgressContainer>

        <TitleContainer>
          <InfoTitle>다음 시간까지 숙제</InfoTitle>
          <UnderLine></UnderLine>
        </TitleContainer>
        <NextHWContainer>
          <div>{nextHW}</div>
          <PlusIconSvg onClick={handlePlusOnClick} />
        </NextHWContainer>
      </ClassInfoSection>
      <Button>저장</Button>
    </ClassWrapper>
  );
};

export default CreateClass;

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
  padding: 0rem 1rem;
  gap: 0.7rem;
  background-color: ${theme.colors.lightGray};
  border-radius: 1rem;
`;
const DateTitle = styled.p`
  /* margin-left: 1rem; */
  /* margin-right: 1.4rem; */
  ${theme.fonts.text01_medium}
`;
const DateInput = styled.input`
  width: 9rem;
  border: none;
  background-color: ${theme.colors.lightGray};
  ${theme.fonts.text02_regular};

  color: ${theme.colors.darkGray};
  &[type='date'] {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    padding: 0.5rem 0.7rem; /* 조절 가능한 패딩 값 */
    border-radius: 4px;
    outline: none;

    &::-webkit-calendar-picker-indicator {
      display: none;
    }
  }
`;
const TimeBox = styled.div`
  display: flex;
  align-items: center;
  width: 14.5rem;
  height: 3.7rem;
  padding: 0rem 1rem;
  gap: 0.7rem;
  background-color: ${theme.colors.lightGray};
  border-radius: 1rem;
`;
const TimeTitle = styled.p`
  /* margin-left: 1rem;
  margin-right: 1.4rem; */
  ${theme.fonts.text01_medium}
`;
const TimeInput = styled.input`
  width: 9rem;
  border: none;
  background-color: ${theme.colors.lightGray};
  color: ${theme.colors.darkGray};
  ${theme.fonts.text02_regular}

  &[type='time'] {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    padding: 0.5rem 0.7rem; /* 조절 가능한 패딩 값 */
    border-radius: 4px;
    outline: none;

    &::-webkit-calendar-picker-indicator {
      background: none;
    }
  }
`;
const PlaceContainer = styled.div`
  display: flex;
  align-items: center;
  width: 30.5rem;
  height: 3.7rem;
  padding: 0rem 1rem;
  gap: 1.4rem;
  background-color: ${theme.colors.lightGray};
  border-radius: 1rem;
`;
const PlaceTitle = styled.p`
  ${theme.fonts.text01_medium}
`;
const PlaceInput = styled.input`
  width: 24rem;
  border: none;
  outline: none;
  color: ${theme.colors.darkGray};
  background-color: ${theme.colors.lightGray};
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
  margin-bottom: 4.6rem;
`;
const ProgressContainer = styled.div`
  width: 100%;
  min-height: 8rem;
  padding: 0.7rem 1.4rem;
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
const NextHWContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
`;
const PlusIconSvg = styled(PlusIcon)`
  margin: 1.5rem 0rem 1.5rem 12.5rem;
  cursor: pointer;
`;
const NextHWInputContainer = styled.div`
  margin-left: 1rem;
`;
const NextHWInput = styled.input`
  width: 23.4rem;
  margin-left: 0.8rem;
  margin-top: 0.5rem;
  outline: none;
  border: none;
  /* border-bottom: 0.1rem ${theme.colors.gray} solid; */
  ${theme.fonts.text02_regular};
`;
const Button = styled.div`
  /* position: fixed; */
  width: 30rem;
  height: 5rem;
  /* bottom: 4.3rem; */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 3.5rem;
  margin-top: 3rem;
  ${theme.fonts.title_bold};
  background-color: ${theme.colors.mainColor};
  color: ${theme.colors.white};
  border-radius: 3rem;
`;
