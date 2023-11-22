import React, { useEffect } from 'react';
import styled from 'styled-components';
import theme from '@src/styles/theme';
import Sliders from './Sliders';
import axios from 'axios';
const dummydata = [
  {
    school: '서강고 2학년',
    name: '김기철 학생 | 수학',
    turn: '8회 진행',
    date: '1회차 2023.08.01',
    state: '입금 미완료',
    won: '400,000원',
  },
  {
    school: '서강고 3학년',
    name: '권보미 학생 | 수학',
    turn: '1회 진행',
    date: '1회차 2023.08.01',
    state: '입금 미완료',
    won: '400,000원',
  },
  {
    school: '서강고 3학년',
    name: '권보미 학생 | 수학',
    turn: '1회 진행',
    date: '1회차 2023.08.01',
    state: '입금 미완료',
    won: '400,000원',
  },
];
const dummydata2 = [{}];
const Money = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const URL = `https://port-0-server-3szcb0g2blp3xl01q.sel5.cloudtype.app/payment`;
        const userToken = localStorage.getItem('userToken');
        const response = await axios.get(URL, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        console.log(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <Wrapper>
      <Title>입금관리</Title>
      <Sliders dummydata={dummydata} />
      <Sliders dummydata={dummydata2} />
    </Wrapper>
  );
};

export default Money;
const Wrapper = styled.div``;
const Title = styled.h1`
  margin-top: 7.3rem;
  margin-left: 3rem;
  ${theme.fonts.headline}
`;
