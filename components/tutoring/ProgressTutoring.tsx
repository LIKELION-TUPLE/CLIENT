import React, { useState, useEffect } from 'react';
import { idProps } from 'pages/classbyday/detail/[id]';
import styled from 'styled-components';
import theme from '@src/styles/theme';
import Header from 'components/common/Header';
import { LeftSmallIcon, RightSmallIcon } from 'asset';
import axios from 'axios';
import { useRouter } from 'next/router';

interface colorProps {
  color: string;
}
export interface tutoringInfo {
  color: string;
  coursePayment: number;
  courseTime: number;
  id: number;
  inviteCode: string;
  parentPhone: string;
  paymentCycle: number;
  paymentDelayed: number;
  studentAge: number;
  studentGrade: number;
  studentName: string;
  studentPhone: string;
  studentSchool: string;
  subject: string;
  totalLessonTime: number;
}
interface classInfo {
  courseId: null;
  currentLessonTime: number;
  date: string;
  dow: string;
  endTime: string;
  id: number;
  place: string;
  startTime: string;
  studyContent: string;
}

const convertedDow = (dow: string) => {
  const dowMap: Record<string, string> = {
    MON: '월요일',
    TUE: '화요일',
    WED: '수요일',
    THU: '목요일',
    FRI: '금요일',
    SAT: '토요일',
    SUN: '일요일',
  };

  return dowMap[dow] || '';
};

const ProgressHead: React.FC<{ date: string; dow: string; lesson: number }> = (data) => {
  const date = new Date(data.date);
  const dow = convertedDow(data.dow);
  const formattedDate = `${date.getMonth() + 1}월 ${date.getDate()}일 ${dow} (${data.lesson}회차)`;

  return <ProgressMain>{formattedDate}</ProgressMain>;
};

const ProgressTutoring: React.FC<idProps> = ({ id }) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const currentDate = `${currentYear}-${currentMonth}-${currentDay}T00:00:00.000+00:00`;
  const [tutoring, setTutoring] = useState<tutoringInfo>({
    color: '',
    coursePayment: 0,
    courseTime: 0,
    id: 0,
    inviteCode: '',
    parentPhone: '',
    paymentCycle: 0,
    paymentDelayed: 0,
    studentAge: 0,
    studentGrade: 0,
    studentName: '',
    studentPhone: '',
    studentSchool: '',
    subject: '',
    totalLessonTime: 0,
  });
  const [classList, setClassList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const URL = `https://port-0-server-3szcb0g2blp3xl01q.sel5.cloudtype.app/course/${id}`;
        const userToken = localStorage.getItem('userToken');
        const response = await axios.get(URL, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        setTutoring(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const URL = `https://port-0-server-3szcb0g2blp3xl01q.sel5.cloudtype.app/lessons/${id}/${year}/${month}`;
        const userToken = localStorage.getItem('userToken');
        const response = await axios.get(URL, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        setClassList(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [id, year, month]);

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

  const handleShowDetail = () => {
    router.replace(`/tutoring/detail/${id}`);
  };

  return (
    <ClassWrapper>
      <Header path={'tutoring/list'} />
      <Title>수업 일지</Title>
      <ClassSection>
        <StudentContainer onClick={handleShowDetail}>
          <ProfileBox color={tutoring.color} />
          <ClassInfoBox>
            <SubInfo>
              {tutoring.studentSchool} {tutoring.studentGrade}학년
            </SubInfo>
            <MainInfo>
              {tutoring.studentName} 학생 | {tutoring.subject}
            </MainInfo>
          </ClassInfoBox>
          {tutoring.totalLessonTime === 0 ? (
            <TurnInfoBox style={{ color: theme.colors.red }}>NEW</TurnInfoBox>
          ) : (
            <TurnInfoBox>{tutoring.totalLessonTime}회차</TurnInfoBox>
          )}
        </StudentContainer>
      </ClassSection>
      <ProgressSection>
        <DateContainer>
          <LeftSmallIcon alt="왼쪽" onClick={handleLeftClick} style={{ cursor: `pointer` }}></LeftSmallIcon>
          <CurrentDate>
            {year}년 {month}월
          </CurrentDate>
          <RightSmallIcon alt="오른쪽" onClick={handleRightClick} style={{ cursor: `pointer` }}></RightSmallIcon>
        </DateContainer>
        <SubTitle>과외 기록</SubTitle>

        {classList.length === 0 ? (
          <ProgressContainer>
            <ProgressMain>수업이 없습니다.</ProgressMain>
          </ProgressContainer>
        ) : (
          <ProgressContainer>
            <ProgressBar>
              {classList.map((data: classInfo, index) => (
                <div key={index}>
                  {data.date < currentDate ? (
                    <>
                      <ProgressDone style={{ backgroundColor: tutoring.color }} />
                      <ProgressBarLine style={{ backgroundColor: tutoring.color }} />
                    </>
                  ) : (
                    <>
                      <ProgressNow style={{ borderColor: tutoring.color }} />
                      {index < classList.length - 1 ? (
                        <ProgressBarLine style={{ backgroundColor: tutoring.color }} />
                      ) : null}
                    </>
                  )}
                </div>
              ))}
            </ProgressBar>

            <ProgressBox>
              {classList.map((data: classInfo) => (
                <ProgressText>
                  <ProgressHead date={data.date} dow={data.dow} lesson={data.currentLessonTime} />
                  <ProgressSub>{data.studyContent}</ProgressSub>
                </ProgressText>
              ))}
            </ProgressBox>
          </ProgressContainer>
        )}
      </ProgressSection>
    </ClassWrapper>
  );
};

export default ProgressTutoring;
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
const CurrentDate = styled.span`
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
`;
const ProgressDone = styled.div`
  width: 1.1rem;
  height: 1.1rem;
  border-radius: 4rem;
`;
const ProgressNow = styled.div`
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 4rem;
  border: 0.25rem solid;
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
