import React, { useEffect, useState } from 'react';
import { ClassListIcon, CalendarIcon, MoneyIcon } from 'asset';
import Image from 'next/image';
import styled from 'styled-components';
import theme from '@src/styles/theme';
interface Props {
  isClick?: boolean;
  onClick?: () => void;
}
const Footer = () => {
  // const [isClicked, setIsClicked] = useState<boolean>(false);
  const [clickedId, setClickedId] = useState<number>(-1);
  const handleClick = (index: number) => {
    setClickedId(index);
  };
  useEffect(() => {
    setClickedId(clickedId);
  }, [clickedId]);
  return (
    <Wrapper>
      <ClassListSvg
        isClick={clickedId === 1}
        onClick={() => handleClick(1)}
        src={ClassListIcon}
        alt="진행 중인 과외 아이콘"></ClassListSvg>
      <CalenderSvg
        isClick={clickedId === 2}
        onClick={() => handleClick(2)}
        src={CalendarIcon}
        alt="캘린더 아이콘"></CalenderSvg>
      <MoneySvg
        isClick={clickedId === 3}
        onClick={() => handleClick(3)}
        src={MoneyIcon}
        alt="입금관리 아이콘"></MoneySvg>
    </Wrapper>
  );
};

export default Footer;
const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  overflow-x: hidden;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 3;

  width: 37.5rem;
  height: 6rem;
  background-color: ${theme.colors.white};
  border-radius: 2rem 2rem 0rem 0rem;
`;
const CalenderSvg = styled(CalendarIcon)<Props>`
  cursor: pointer;
  color: ${({ isClick }) => (isClick ? theme.colors.mainColor : theme.colors.gray)};
`;

const ClassListSvg = styled(ClassListIcon)<Props>`
  cursor: pointer;
  color: ${({ isClick }) => (isClick ? theme.colors.mainColor : theme.colors.gray)};
`;

const MoneySvg = styled(MoneyIcon)<Props>`
  cursor: pointer;
  stroke: ${({ isClick }) => (isClick ? theme.colors.mainColor : theme.colors.gray)};
`;
