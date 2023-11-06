import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import * as moment from 'moment';
import 'moment/locale/ko';
import { dayList } from 'data/dummy';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Layout from '../common/Layout';
import theme from '@src/styles/theme';
import { useSetRecoilState } from 'recoil';
import { dateSelect } from '../../atoms/selector';
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

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
        <SubTitle>오늘의 수업</SubTitle>
        <ClassContainer></ClassContainer>
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
`;
const SubTitle = styled.h2`
  margin-top: 0.8rem;
  ${theme.fonts.text01_medium};
  color: ${theme.colors.middleGray};
`;
const ClassSection = styled.section``;
const DateTitle = styled.h1``;
const ClassContainer = styled.div``;
