import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
// import * as moment from 'moment';
import moment, { MomentInput } from 'moment';
import 'moment/locale/ko';
import { dayList, studentList } from 'data/dummy';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import theme from '@src/styles/theme';
import { useSetRecoilState } from 'recoil';
import { dateSelect } from '../../atoms/selector';
import { PlusClass } from 'asset';
import axios from 'axios';
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
interface colorProps {
  color: string;
}
const TupleCalendar = () => {
  const router = useRouter();
  const [date, setDate] = useState<Value>(new Date()); //선택된 날짜
  const setSelectDate = useSetRecoilState(dateSelect);
  const addContent = ({ date }: any) => {
    const contents = [];
    if (dayList.find((day) => day === moment(date).format('YYYY-MM-DD'))) {
      contents.push(<div className="dot"></div>);
    }
    return <div>{contents}</div>;
  };
  const handleClick = () => {
    router.replace('/classbyday');
  };
  const fetchDateData = async () => {
    try {
      const URL = `https://port-0-server-3szcb0g2blp3xl01q.sel5.cloudtype.app/lessons/today`;
      const userToken = localStorage.getItem('userToken');
      const response = await axios.get(URL, {
        params: {
          date: '2023-11-16', // 원하는 데이터를 여기에 추가하세요
        },
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  useEffect(() => {
    if (date) {
      setSelectDate(moment(date as MomentInput).format('YYYY-MM-DD'));
    }
  }, [date]);
  useEffect(() => {
    fetchDateData();
  }, []);
  return (
    <CalendarWrapper>
      <TitleSection>
        <SubTitle>최인강 선생님, 어서오세요!</SubTitle>
        <Title>과외 일정</Title>
      </TitleSection>
      <CalendarSection>
        <Calendar
          locale="ko"
          onChange={setDate}
          formatDay={(locale, date) => moment(date).format('D')} // 0일
          next2Label={null} //년 네비게이션 표시 여부
          prev2Label={null} //년 네비게이션 표시 여부
          showNeighboringMonth={false} //최근 달 일자 표시 여부
          tileContent={addContent}
          onClickDay={handleClick}
          value={date}
        />
      </CalendarSection>
      <ClassSection>
        <DateTitle>{moment(date as MomentInput).format('MM월 DD일 (dd)')}</DateTitle>
        <DateSubTitle>오늘의 수업</DateSubTitle>
        {studentList.map((student) => (
          <ClassContainer>
            <ProfileBox color={student.color} />
            <ClassInfoBox>
              <SubInfo>{student.school}</SubInfo>
              <MainInfo>
                {student.name} 학생 | {student.subject}
              </MainInfo>
              <SubInfo>{student.time}</SubInfo>
            </ClassInfoBox>
            <TurnInfoBox>{student.turn}</TurnInfoBox>
          </ClassContainer>
        ))}
        <PlusClassContainer>
          <PlusClass
            onClick={() => {
              router.replace(`/classbyday/create`);
            }}
          />
        </PlusClassContainer>
      </ClassSection>
    </CalendarWrapper>
  );
};

export default TupleCalendar;
const CalendarWrapper = styled.div``;
const TitleSection = styled.div`
  margin-top: 4.3rem;
  margin-left: 3rem;
`;
const Title = styled.h1`
  ${theme.fonts.headline};
  margin-top: 0.8rem;
`;
const SubTitle = styled.h2`
  ${theme.fonts.text01_medium};
  color: ${theme.colors.middleGray};
`;
const CalendarSection = styled.div`
  width: 33.5rem;
  height: 35.6rem;
  margin: 3rem 0rem 1.5rem 2rem;
`;
const ClassSection = styled.div`
  width: 33.5rem;
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  margin-bottom: 9.5rem;
  padding: 1.4rem;

  background-color: ${theme.colors.white};
  border-radius: 1rem;
`;
const PlusClassContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;
const DateTitle = styled.h1`
  margin-bottom: 1.6rem;
  padding-left: 0.6rem;
  ${theme.fonts.subheadline};
`;
const DateSubTitle = styled.h2`
  padding-left: 1.1rem;
  margin-bottom: 0.8rem;
  ${theme.fonts.subtitle_medium};
  color: ${theme.colors.black};
`;
const ClassContainer = styled.div`
  display: flex;
  align-items: center;
  width: 30.5rem;
  height: 7.5rem;
  margin-bottom: 1.4rem;
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
  color: ${theme.colors.darkGray};
`;
const MainInfo = styled.div`
  ${theme.fonts.text01_medium};
`;
