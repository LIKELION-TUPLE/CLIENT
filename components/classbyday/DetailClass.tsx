import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from '@src/styles/theme';
import { idProps } from 'pages/classbyday/detail/[id]';
import Header from 'components/common/Header';
import { CheckedButtonIcon, UnCheckedButtonIcon, TrashIcon } from 'asset/index';
import axios from 'axios';
import Modal from 'react-modal';
import ReactModal from 'react-modal';
import { useRouter } from 'next/router';

interface colorProps {
  color: string;
}

interface lessonInfo {
  color: string;
  courseId: number;
  currentLessonTime: number;
  date: string;
  dow: string;
  endTime: string;
  homeworkForNextList: string[];
  homeworkForTodayList: string[];
  id: number;
  place: string;
  startTime: string;
  studentGrade: number;
  studentName: string;
  studentSchool: string;
  studyContent: string;
  subject: string;
  teacherName: string;
}

const ParsedDate: React.FC<{ date: string | undefined }> = (data) => {
  const date = new Date(data.date as string);
  const formattedDate = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

  return <span>{formattedDate}</span>;
};

const DetailClass = (props: idProps) => {
  const { id } = props;
  const [lessonId, setLessonId] = useState(id);
  const [classInfo, setClassInfo] = useState<lessonInfo>();
  const router = useRouter();

  const modalStyle: ReactModal.Styles = {
    overlay: {
      backgroundColor: ' rgba(0, 0, 0, 0.4)',
      width: '100%',
      height: '100vh',
      zIndex: '10',
      position: 'fixed',
      top: '0',
      left: '0',
    },
    content: {
      width: '27rem',
      height: '13.6rem',
      zIndex: '150',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      padding: 0,
      borderRadius: '10px',
      boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
      backgroundColor: 'white',
      overflow: 'auto',
    },
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const formattedTime = (timeString: string) => {
    const time = new Date(`2000-01-01T${timeString}`);
    const hours = time.getHours();
    const minutes = time.getMinutes();

    // 시간과 분을 2자리 숫자로 표시하기 위해 조건부 삼항 연산자 사용
    const formattedTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

    return formattedTime;
  };

  const handleEdit = () => {};
  const handleDelete = async () => {
    try {
      const URL = `https://port-0-server-3szcb0g2blp3xl01q.sel5.cloudtype.app/lessons/delete-lesson/${id}`;
      const userToken = localStorage.getItem('userToken');
      const response = await axios.delete(URL, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      console.log(response.data);
      router.replace('/calendar');
    } catch (err) {
      console.error('Err:', err);
    }
  };

  // 드롭다운을 위한 학생 정보
  const fetchStudentInfo = async (lesson_id) => {
    try {
      const URL = `https://port-0-server-3szcb0g2blp3xl01q.sel5.cloudtype.app/lessons/lesson-detail/${lesson_id}`;
      const userToken = localStorage.getItem('userToken');
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      console.log(response.data);
      setClassInfo(response.data);
    } catch (err) {
      console.error('Err:', err);
    }
  };
  useEffect(() => {
    fetchStudentInfo(lessonId);
  }, []);

  return (
    <ClassWrapper>
      <Header path={'calendar'} />
      <Title>수업일지</Title>
      <MainInfoSection>
        <StudentContainer>
          <ProfileBox color={classInfo?.color} />
          <ClassInfoBox>
            <SubInfo>{classInfo?.studentSchool}</SubInfo>
            <MainInfo>
              {classInfo?.studentName} 학생 | {classInfo?.subject}
            </MainInfo>
          </ClassInfoBox>
          <TurnInfoBox>{classInfo?.currentLessonTime}회차</TurnInfoBox>
        </StudentContainer>
        <DateContainer>
          <DateBox>
            <DateTitle>날짜</DateTitle>
            <ParsedDate date={classInfo?.date} />
          </DateBox>
          <TimeBox>
            <TimeTitle>시간</TimeTitle>
            <TimeInput>
              {formattedTime(classInfo?.startTime)} ~ {formattedTime(classInfo?.endTime)}
            </TimeInput>
          </TimeBox>
        </DateContainer>
        <PlaceContainer>
          <PlaceTitle>장소</PlaceTitle>
          <PlaceInput>{classInfo?.place}</PlaceInput>
        </PlaceContainer>
      </MainInfoSection>
      <ClassInfoSection>
        <Container>
          <TitleContainer>
            <InfoTitle>오늘까지 숙제</InfoTitle>
            <UnderLine></UnderLine>
          </TitleContainer>
          {classInfo?.homeworkForTodayList &&
            classInfo.homeworkForTodayList.map((hw) => (
              <TodayHWContainer>
                <CheckButton>{hw?.completed ? <CheckedButtonIcon /> : <UnCheckedButtonIcon />}</CheckButton>
                <Homework>{hw?.homeworkContent}</Homework>
              </TodayHWContainer>
            ))}
        </Container>
        <TitleContainer>
          <InfoTitle>오늘 나간 진도</InfoTitle>
          <UnderLine></UnderLine>
        </TitleContainer>
        <ProgressContainer>{classInfo?.studyContent}</ProgressContainer>
        <NextHWContainer>
          <TitleContainer>
            <InfoTitle>다음 시간까지 숙제</InfoTitle>
            <UnderLine></UnderLine>
          </TitleContainer>
          {classInfo?.homeworkForNextList &&
            classInfo.homeworkForNextList.map((hwNext) => <Homework>{hwNext?.homeworkContent}</Homework>)}
        </NextHWContainer>
      </ClassInfoSection>

      <ButtonWrapper>
        <BottomEditButton type="submit" onClick={handleEdit}>
          수정
        </BottomEditButton>
        <BottomDeleteButton type="submit" onClick={openModal}>
          삭제
        </BottomDeleteButton>
        <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Check Delete" style={modalStyle}>
          <DeleteWrapper>
            <DeleteContainer>
              <DeleteTitle>정보 삭제</DeleteTitle>
              <DeleteContent>
                학생 정보와 과외 정보를 전부
                <br />
                삭제하시겠습니까?
              </DeleteContent>
            </DeleteContainer>
            <DeleteButton>
              <DeleteOkButton type="submit" onClick={handleDelete}>
                네
              </DeleteOkButton>
              <DeleteNoButton type="button" onClick={closeModal}>
                아니오
              </DeleteNoButton>
            </DeleteButton>
          </DeleteWrapper>
        </Modal>
      </ButtonWrapper>
    </ClassWrapper>
  );
};

export default DetailClass;
const ClassWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  margin-top: 7.3rem;
  margin-left: 3rem;
  ${theme.fonts.headline};
`;
const MainInfoSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  margin-bottom: 0.9rem;
  padding: 1.1rem 1.5rem;
  background-color: ${theme.colors.lightGray};
  border-radius: 1rem;
`;
const DateContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
`;
const DateBox = styled.div`
  display: flex;
  align-items: center;
  width: 14.5rem;
  height: 3.7rem;
  background-color: ${theme.colors.lightGray};
  border-radius: 1rem;
`;
const DateTitle = styled.p`
  margin-left: 1rem;
  margin-right: 1.4rem;
  ${theme.fonts.text01_medium}
`;
const DateInput = styled.p`
  ${theme.fonts.text02_regular}
`;
const TimeBox = styled.div`
  display: flex;
  align-items: center;
  width: 14.5rem;
  height: 3.7rem;
  background-color: ${theme.colors.lightGray};
  border-radius: 1rem;
`;
const TimeTitle = styled.p`
  margin-left: 1rem;
  margin-right: 1.4rem;
  ${theme.fonts.text01_medium}
`;
const TimeInput = styled.p`
  ${theme.fonts.text02_regular}
`;

const PlaceContainer = styled.div`
  display: flex;
  align-items: center;
  width: 30.5rem;
  height: 3.7rem;
  background-color: ${theme.colors.lightGray};
  border-radius: 1rem;
`;

const PlaceTitle = styled.p`
  margin-left: 1rem;
  margin-right: 1.4rem;
  ${theme.fonts.text01_medium}
`;
const PlaceInput = styled.p`
  ${theme.fonts.text02_regular}
`;
const ClassInfoSection = styled.section`
  width: 30.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 1rem;
  margin-left: 3.5rem;
  padding: 1.2rem;
  background-color: ${theme.colors.white};
  border-radius: 1.25rem;
`;
const Container = styled.div`
  margin-bottom: 4.6rem;
`;
const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.3rem;
`;
const InfoTitle = styled.h2`
  width: 100%;
  padding-left: 0.8rem;
  ${theme.fonts.text01_medium};
  margin-bottom: 0.2rem;
`;
const UnderLine = styled.div`
  width: 28rem;
  height: 0.05rem;
  margin-bottom: 1rem;
  background-color: ${theme.colors.darkGray};
`;
const TodayHWContainer = styled.div`
  height: 1.7rem;
  display: flex;
  align-items: center;
  margin-left: 0.8rem;
  /* margin-bottom: 4.6rem; */
`;
const CheckButton = styled.div``;
const Homework = styled.p`
  margin-left: 1.2rem;
  margin-bottom: 0.5rem;
  ${theme.fonts.text02_regular};
`;
const ProgressContainer = styled.div`
  width: 100%;
  min-height: 8rem;
  padding: 0.5rem 1.4rem;
  margin-bottom: 4.6rem;
  background-color: ${theme.colors.backgroundColor};
  ${theme.fonts.text02_regular};
  border-radius: 1rem;
`;
const ProgressInput = styled.input`
  width: 100%;
  background-color: ${theme.colors.backgroundColor};
  outline: none;
  border: none;
`;
const NextHWContainer = styled.div``;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-left: 3rem;
`;

const BottomEditButton = styled.button`
  margin-top: 2rem;
  margin-bottom: 4.5rem;

  width: 20rem;
  height: 5rem;
  border-radius: 3rem;
  border: none;

  background-color: ${theme.colors.gray};
  color: ${theme.colors.white};
  ${theme.fonts.title_bold};

  cursor: pointer;
`;

const BottomDeleteButton = styled.button`
  margin-top: 2rem;
  margin-bottom: 4.5rem;

  width: 9rem;
  height: 5rem;
  border-radius: 3rem;
  border: none;

  background-color: ${theme.colors.red};
  color: ${theme.colors.white};
  ${theme.fonts.title_bold};

  cursor: pointer;
`;

const DeleteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.4rem;
  width: 100%;
  height: 100%;
`;

const DeleteContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  width: 100%;
  margin-top: 1.6rem;
  text-align: center;
`;

const DeleteTitle = styled.div`
  ${theme.fonts.title_regular};
`;

const DeleteContent = styled.div`
  ${theme.fonts.text02_regular}
`;

const DeleteButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: solid 0.1rem ${theme.colors.gray};
`;

const DeleteOkButton = styled.button`
  width: 13.3rem;
  height: 4rem;
  border-right: solid 0.1rem ${theme.colors.gray};
  ${theme.fonts.title_regular};
  color: ${theme.colors.mainColor};

  &:hover {
    background-color: ${theme.colors.mainColor};
    color: ${theme.colors.white};
  }
`;

const DeleteNoButton = styled.button`
  width: 13.3rem;
  height: 4rem;
  ${theme.fonts.title_regular};
  color: ${theme.colors.mainColor};

  &:hover {
    background-color: ${theme.colors.mainColor};
    color: ${theme.colors.white};
  }
`;
