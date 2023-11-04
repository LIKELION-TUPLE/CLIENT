import React from 'react';
import { ClassListIcon, CalendarIcon, MoneyIcon } from 'asset';
import Image from 'next/image';
import styled from 'styled-components';
const Footer = () => {
  return (
    <Wrapper>
      <Image src={ClassListIcon} alt="진행 중인 과외 아이콘"></Image>
      <Image src={CalendarIcon} alt="캘린더 아이콘"></Image>
      <Image src={MoneyIcon} alt="입금관리 아이콘"></Image>
    </Wrapper>
  );
};

export default Footer;
const Wrapper = styled.div`
background-coloe:
  height: 4rem;
`;
