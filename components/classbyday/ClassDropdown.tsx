import React, { useState } from 'react';
import styled from 'styled-components';
import { studentList } from 'data/dummy';
import theme from '@src/styles/theme';
interface Props {
  onClick?: () => void;
}
interface colorProps {
  color: string;
}
interface stuProps {
  onClick?: () => void;
  turn: number;
}
const ClassDropdown = ({ giveStudentInfo, giveSelected }: any) => {
  const [clickedStudent, setClickedStudent] = useState<number>(0);
  const handleClickStudent = (student: number) => {
    // if (clickedStudent === student) {
    //   // setClickedStudent('');
    //   return;
    // }

    setClickedStudent(student);
    // 모달 닫기를 위해 선택되었는지 여부를 상위로 전달
    giveSelected(false);
    giveStudentInfo(student);
  };
  return (
    <ListWrapper>
      {studentList.map((student) => (
        <>
          <StudentContainer turn={student.id} onClick={() => handleClickStudent(student.id)}>
            <ProfileBox color={student.color} />
            <ClassInfoBox>
              <SubInfo>{student.school}</SubInfo>
              <MainInfo>
                {student.name} 학생 | {student.subject}
              </MainInfo>
            </ClassInfoBox>
            <TurnInfoBox>{student.turn}</TurnInfoBox>
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
