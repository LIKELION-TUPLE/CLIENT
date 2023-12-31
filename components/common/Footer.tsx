import React, { useEffect, useState } from 'react';
import {
  ColorCalendarIcon,
  ColorClasslistIcon,
  ColorMoneyIcon,
  NoColorCalendarIcon,
  NoColorClasslistIcon,
  NoColorMoneyIcon,
} from 'asset';
import styled from 'styled-components';
import theme from '@src/styles/theme';
import { useRouter } from 'next/router';
interface Props {
  isClick?: boolean;
  onClick?: () => void;
}
const Footer = () => {
  const router = useRouter();
  const { pathname } = useRouter();
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    setUserRole(userRole || '');
    console.log(userRole);
  }, []);

  return (
    <Wrapper>
      {pathname.startsWith(`/tutoring`) ? (
        <ColorClasslistIcon alt="진행 중인 과외 아이콘" style={{ cursor: `pointer` }} />
      ) : (
        <NoColorClasslistIcon
          onClick={() => router.replace(`/tutoring/list`)}
          alt="진행 중인 과외 아이콘"
          style={{ cursor: `pointer` }}
        />
      )}
      {pathname.startsWith(`/calendar`) ? (
        <ColorCalendarIcon alt="캘린더 아이콘" style={{ cursor: `pointer` }} />
      ) : (
        <NoColorCalendarIcon
          onClick={() => router.replace(`/calendar`)}
          alt="캘린더 아이콘"
          style={{ cursor: `pointer` }}
        />
      )}
      {userRole === 'ROLE_TEACHER' ? (
        <div>
          {pathname.startsWith(`/payment`) ? (
            <ColorMoneyIcon alt="입금 관리 아이콘" style={{ cursor: `pointer` }} />
          ) : (
            <NoColorMoneyIcon
              onClick={() => router.replace(`/payment`)}
              alt="입금 관리 아이콘"
              style={{ cursor: `pointer` }}
            />
          )}
        </div>
      ) : null}
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
// const CalenderSvg = styled(CalendarIcon)<Props>`
//   cursor: pointer;
//   color: ${({ isClick }) => (isClick ? theme.colors.mainColor : theme.colors.gray)};
// `;

// const ClassListSvg = styled(ClassListIcon)<Props>`
//   cursor: pointer;
//   color: ${({ isClick }) => (isClick ? theme.colors.mainColor : theme.colors.gray)};
// `;

// const MoneySvg = styled(MoneyIcon)<Props>`
//   cursor: pointer;
//   stroke: ${({ isClick }) => (isClick ? theme.colors.mainColor : theme.colors.gray)};
// `;
