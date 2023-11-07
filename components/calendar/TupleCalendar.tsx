import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import * as moment from 'moment';
import 'moment/locale/ko';
import { dayList, studentList } from 'data/dummy';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Layout from '../common/Layout';
import theme from '@src/styles/theme';
import { useSetRecoilState } from 'recoil';
import { dateSelect } from '../../atoms/selector';
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
  useEffect(() => {
    setSelectDate(moment(date).format('YYYY-MM-DD'));
  }, [date]);
  return (
    <Layout noHeader>
      <TitleSection>
        <SubTitle>김인강 선생님, 어서오세요!</SubTitle>
        <Title>과외 일정</Title>
      </TitleSection>
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
      <ClassSection>
        <DateTitle>{moment(date).format('MM월 DD일 (dd)')}</DateTitle>
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
      </ClassSection>
    </Layout>
  );
};

export default TupleCalendar;

const TitleSection = styled.div`
  margin: 4.3rem 3rem 0em 3rem;
`;
const Title = styled.h1`
  ${theme.fonts.headline};
  margin-top: 0.8rem;
`;
const SubTitle = styled.h2`
  ${theme.fonts.text01_medium};
  color: ${theme.colors.middleGray};
`;
const ClassSection = styled.section`
  width: 33.5rem;
  margin: 2rem;
  padding: 1.4rem;
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.white};
  border-radius: 1rem;
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
