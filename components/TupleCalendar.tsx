import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import * as moment from 'moment';
import 'moment/locale/ko';
import { dayList } from 'data/dummy';
import styled from 'styled-components';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const TupleCalendar = () => {
  const [date, setDate] = useState<Value>(new Date()); //선택된 날짜
  const addContent = ({ date }: any) => {
    const contents = [];
    if (dayList.find((day) => day === moment(date).format('YYYY-MM-DD'))) {
      contents.push(<div className="dot"></div>);
    }
    return <div>{contents}</div>;
  };
  useEffect(() => {
    // console.log(contents);
  }, []);
  return (
    <Wrapper>
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
        value={date}
      />
      <ClassSection>
        <DateTitle>{moment(date).format('MM월 DD일 (dd)')}</DateTitle>
        <SubTitle>오늘의 수업</SubTitle>
        <ClassContainer></ClassContainer>
      </ClassSection>
    </Wrapper>
  );
};

export default TupleCalendar;
const Wrapper = styled.div``;
const TitleSection = styled.div``;
const Title = styled.h1``;
const SubTitle = styled.h2``;
const ClassSection = styled.section``;
const DateTitle = styled.h1``;
const ClassContainer = styled.div``;
