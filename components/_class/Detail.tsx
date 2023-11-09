import React from 'react';
import styled from 'styled-components';
import theme from '@src/styles/theme';
import { idProps } from 'pages/_class/detail/[id]';
import Header from 'components/common/Header';
import { classList } from 'data/dummy';
interface colorProps {
  color: string;
}
const Detail = (props: idProps) => {
  const { id } = props;

  return (
    <ClassWrapper>
      <Header path={'calendar'} />
      <Title>수업일지</Title>
      <MainInfoSection>
        {classList.map((student) => (
          <StudentContainer>
            <ProfileBox color={student.color} />
            <ClassInfoBox>
              <SubInfo>{student.school}</SubInfo>
              <MainInfo>
                {student.name} 학생 | {student.subject}
              </MainInfo>
            </ClassInfoBox>
            <TurnInfoBox>{student.turn}</TurnInfoBox>
          </StudentContainer>
        ))}
        <DateContainer>
          <DateBox></DateBox>
          <TimeBox></TimeBox>
        </DateContainer>
        <PlaceContainer></PlaceContainer>
      </MainInfoSection>
      <ClassInfoSection></ClassInfoSection>
    </ClassWrapper>
  );
};

export default Detail;
const ClassWrapper = styled.div``;

const Title = styled.h1`
  margin-top: 7.3rem;
  margin-left: 3rem;
  ${theme.fonts.headline};
`;
const MainInfoSection = styled.section`
  margin-top: 3rem;
  margin-left: 3.5rem;
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
  color: ${theme.colors.black};
`;
const MainInfo = styled.div`
  ${theme.fonts.text01_medium};
`;
const StudentContainer = styled.div`
  display: flex;
  align-items: center;
  width: 30.5rem;
  height: 7.5rem;
  margin-bottom: 1.4rem;
  padding: 1.1rem 1.5rem;
  background-color: ${theme.colors.lightGray};
  border-radius: 1rem;
`;
const DateContainer = styled.div`
  display: flex;
`;
const DateBox = styled.div``;
const TimeBox = styled.div``;
const PlaceContainer = styled.div``;
const ClassInfoSection = styled.section``;
