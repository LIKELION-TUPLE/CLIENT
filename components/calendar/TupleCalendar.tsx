import React, { useEffect, useState, MouseEvent } from 'react';
import Calendar from 'react-calendar';
// import * as moment from 'moment';
import moment, { MomentInput } from 'moment';
import 'moment/locale/ko';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import theme from '@src/styles/theme';
import { useSetRecoilState } from 'recoil';
import { dateSelect } from '../../atoms/selector';
import { PlusClass } from 'asset';
import axios from 'axios';
interface colorProps {
  color: string;
}
interface lessonInfo {
  course_id: number;
  color: string;
  studentName: string;
  school: string;
  studentGrade: number;
  teacherName: string;
  subject: string;
  currentLessonTime: number;
  startTime: string;
  endTime: string;
  lesson_id: number;
}

const TupleCalendar = () => {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [lessonList, setLessonList] = useState<lessonInfo[]>([]);
  const setSelectDate = useSetRecoilState(dateSelect);

  const fetchDateData = async (date: Date) => {
    console.log(date);
    try {
      const URL = `https://port-0-server-3szcb0g2blp3xl01q.sel5.cloudtype.app/lessons/today`;
      const userToken = localStorage.getItem('userToken');
      const response = await axios.get(URL, {
        params: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate(),
        },
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      console.log(response.data);
      setLessonList(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const formattedTime = (timeString: string) => {
    const time = new Date(`2000-01-01T${timeString}`);
    const hours = time.getHours();
    const minutes = time.getMinutes();

    // 시간과 분을 2자리 숫자로 표시하기 위해 조건부 삼항 연산자 사용
    const formattedTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

    return formattedTime;
  };
  // type MyEventHandler<T> = React.MouseEvent<T>;

  const handleChange = (value: Date, event: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setDate(value);
    fetchDateData(value);
  };

  const handleShowDetail = (lessonid: number) => {
    router.replace(`/classbyday/detail/${lessonid}`);
  };

  useEffect(() => {
    if (date) {
      setSelectDate(moment(date as MomentInput).format('YYYY-MM-DD'));
    }
  }, [date]);

  useEffect(() => {
    const userName = localStorage.getItem('userName');
    setUserName(userName || '');
    const userRole = localStorage.getItem('userRole');
    setUserRole(userRole || '');
    fetchDateData(date);
  }, []);

  return (
    <CalendarWrapper>
      <TitleSection>
        <SubTitle>
          {userName} {userRole === 'ROLE_TEACHER' ? '선생님' : '학생'}, 어서오세요!
        </SubTitle>
        <Title>과외 일정</Title>
      </TitleSection>
      <CalendarSection>
        <Calendar
          locale="ko"
          onChange={handleChange}
          formatDay={(locale, date) => moment(date).format('D')} // 0일
          next2Label={null} //년 네비게이션 표시 여부
          prev2Label={null} //년 네비게이션 표시 여부
          showNeighboringMonth={false} //최근 달 일자 표시 여부
          value={date}
          tileClassName={({ date, view }) => {
            // 현재 날짜가 선택된 날짜인 경우에 클래스를 추가
            if (
              view === 'month' &&
              date.getDate() === date.getDate() &&
              date.getMonth() === date.getMonth() &&
              date.getFullYear() === date.getFullYear()
            ) {
              return 'selected-date';
            }
            return null;
          }}
        />
      </CalendarSection>
      <ClassSection>
        <DateTitle>{moment(date as MomentInput).format('MM월 DD일 (dd)')}</DateTitle>
        <DateSubTitle>오늘의 수업</DateSubTitle>
        {lessonList.map((lesson) => (
          <ClassContainer onClick={() => handleShowDetail(lesson.lesson_id)}>
            <ProfileBox color={lesson.color} />
            <ClassInfoBox>
              <SubInfo>{lesson.school}</SubInfo>
              <MainInfo>
                {userRole === 'ROLE_TEACHER' ? (
                  <div>
                    {lesson.studentName} 학생 | {lesson.subject}
                  </div>
                ) : (
                  <div>
                    {lesson.teacherName} 선생님 | {lesson.subject}
                  </div>
                )}
              </MainInfo>
              <SubInfo>
                {formattedTime(lesson.startTime)} ~ {formattedTime(lesson.endTime)}
              </SubInfo>
            </ClassInfoBox>
            <TurnInfoBox>{lesson.currentLessonTime}회차</TurnInfoBox>
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
  cursor: pointer;
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
