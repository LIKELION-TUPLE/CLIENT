import React from 'react';
import { LeftIcon } from 'asset';
import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import { selectedDate } from 'atoms/atom';
import styled from 'styled-components';
import Layout from './common/Layout';
const ClassbyDay = () => {
  const date = useRecoilValue(selectedDate);
  return (
    <Layout>
      <Image src={LeftIcon} alt="뒤로가기" width={27} height={27} />
      <Title>{date}</Title>
    </Layout>
  );
};

export default ClassbyDay;
const Wrapper = styled.div``;
const Title = styled.h1``;
