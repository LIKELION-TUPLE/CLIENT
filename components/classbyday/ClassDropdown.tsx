import React, { use, useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from '@src/styles/theme';
// import type { courseProps } from 'CreateClass';

interface colorProps {
  color: string;
}
interface stuProps {
  onClick?: () => void;
  turn: number;
}

export interface courseProps {
  course_id: number;
  color: string;
  studentName: string;
  studentSchool: string;
  studentGrade: number;
  teacherName: string;
  subject: string;
  currentLessonTime: number;
}
const ClassDropdown = ({ giveStudentInfo, giveSelected, studentList }: any) => {
  const handleClickStudent = (student: number) => {
    giveSelected(false);
    giveStudentInfo(student);
  };
  return (
    <ListWrapper>
      {studentList?.map((student: courseProps) => (
        <>
          <StudentContainer turn={student?.course_id} onClick={() => handleClickStudent(student?.course_id)}>
            <ProfileBox color={student?.color} />
            <ClassInfoBox>
              <SubInfo>
                {student?.studentSchool} {student?.studentGrade}학년
              </SubInfo>
              <MainInfo>
                {student?.studentName} 학생 | {student?.subject}
              </MainInfo>
            </ClassInfoBox>
            <TurnInfoBox>{student?.currentLessonTime}회차</TurnInfoBox>
            {/* <Image src={DownButton} alt="드롭다운" width={24} height={24} /> */}
          </StudentContainer>
        </>
      ))}
    </ListWrapper>
  );
};

export default ClassDropdown;
const ListWrapper = styled.ul`
  position: relative;
  flex-shrink: 0;

  width: 30.5rem;
  display: flex;
  flex-direction: column;

  /* background: ${theme.colors.white}; */
  border-radius: 0.6rem;
  border: none;
  /* sophy_shadow1 */
  box-shadow: 1px 1.8014705181121826px 12px 0px rgba(64, 119, 118, 0.17);
`;
const StudentContainer = styled.div<stuProps>`
  display: flex;
  align-items: center;
  width: 30.5rem;
  height: 7.5rem;
  margin-top: ${(props) => (props.turn !== 0 ? `-1rem` : `0rem`)};
  padding: 1.1rem 1.5rem;
  z-index: 1;

  background-color: ${theme.colors.lightGray};
  border-radius: 1rem;
  cursor: pointer;
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
