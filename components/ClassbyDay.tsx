import React from 'react';
import { LeftIcon } from 'asset';
import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import { selectedDate } from 'atoms/atom';
import styled from 'styled-components';
const ClassbyDay = () => {
  const date = useRecoilValue(selectedDate);
  return (
    <Wrapper>
      <Image src={LeftIcon} alt="뒤로가기" width={27} height={27} />
      <Title>{date}</Title>
    </Wrapper>
  );
};

export default ClassbyDay;
const Wrapper = styled.div``;
const Title = styled.h1``;
