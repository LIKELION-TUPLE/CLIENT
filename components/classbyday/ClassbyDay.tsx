import React from 'react';
import { useRecoilValue } from 'recoil';
import { selectedDate } from 'atoms/atom';
import styled from 'styled-components';
import Layout from '../common/Layout';
const ClassbyDay = () => {
  const date = useRecoilValue(selectedDate);
  return (
    <Layout>
      <Title>{date}</Title>
    </Layout>
  );
};

export default ClassbyDay;
const Title = styled.h1``;
