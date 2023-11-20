import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PlusIcon } from 'asset';
import theme from '@src/styles/theme';
import { useRouter } from 'next/router';
import axios from 'axios';
interface colorProps {
  color: string;
}
interface tutoringInfo {
  color: string;
  course_id: number;
  currentLessonTime: number;
  studentGrade: number;
  studentName: string;
  studentSchool: string;
  subject: string;
  teacherName: string;
}
const ClassList = () => {
  const [studentList, setStudentList] = useState([]);
  const router = useRouter();
  const handleCreateTutoring = () => {
    router.replace('/tutoring/create');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const URL = `https://port-0-server-3szcb0g2blp3xl01q.sel5.cloudtype.app/course/course-list`;
        const userToken = localStorage.getItem('userToken');
        const response = await axios.get(URL, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        setStudentList(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <ClassWrapper>
      <Title>진행 중인 과외</Title>
      <ClassSection>
        {studentList.map((student: tutoringInfo) => (
          <StudentContainer>
            <ProfileBox color={student.color} />
            <ClassInfoBox>
              <SubInfo>{student.studentSchool}</SubInfo>
              <MainInfo>
                {student.studentName} 학생 | {student.subject}
              </MainInfo>
            </ClassInfoBox>
            <TurnInfoBox>{student.currentLessonTime}회차</TurnInfoBox>
          </StudentContainer>
        ))}
        <PlusIconSvg type="button" onClick={handleCreateTutoring} />
      </ClassSection>
    </ClassWrapper>
  );
};

export default ClassList;
const Title = styled.h1`
  margin-top: 7.3rem;
  margin-left: 3rem;
  ${theme.fonts.headline};
`;
const ClassWrapper = styled.div``;
const ClassSection = styled.section`
  width: 33.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 3rem;
  margin-left: 2rem;
  padding: 1.5rem;
  background-color: ${theme.colors.white};
  border-radius: 1.25rem;
`;
const StudentContainer = styled.div`
  display: flex;
  align-items: center;
  width: 30.5rem;
  height: 7.5rem;
  margin-bottom: 0.9rem;
  padding: 1.1rem 1.5rem;
  background-color: ${theme.colors.lightGray};
  border-radius: 1rem;
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
const PlusIconSvg = styled(PlusIcon)`
  margin: 1.5rem 0rem 1.5rem 13.6rem;
  cursor: pointer;
`;
