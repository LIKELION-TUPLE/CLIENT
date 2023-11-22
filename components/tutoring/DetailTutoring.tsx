import React, { useEffect, useState } from 'react';
import Layout from '../common/Layout';
import styled from 'styled-components';
import theme from '@src/styles/theme';
import Header from 'components/common/Header';
import { useRouter } from 'next/router';
import axios from 'axios';
import { idProps } from 'pages/tutoring/detail/[id]';
import { tutoringInfo } from './ProgressTutoring';
import Modal from 'react-modal';
import ReactModal from 'react-modal';
import copy from 'copy-to-clipboard';

const DetailTutoring: React.FC<idProps> = ({ id }) => {
  const router = useRouter();
  const [tutoring, setTutoring] = useState<tutoringInfo>({
    color: '',
    coursePayment: 0,
    courseTime: 0,
    id: 0,
    inviteCode: '',
    parentPhone: '',
    paymentCycle: 0,
    paymentDelayed: 0,
    studentAge: 0,
    studentGrade: 0,
    studentName: '',
    studentPhone: '',
    studentSchool: '',
    subject: '',
    totalLessonTime: 0,
  });

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const URL = `https://port-0-server-3szcb0g2blp3xl01q.sel5.cloudtype.app/course/${id}`;
        const userToken = localStorage.getItem('userToken');
        const response = await axios.get(URL, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        setTutoring(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleEdit = () => {
    router.replace(`/tutoring/edit/${id}`);
  };

  const handleDelete = async () => {
    try {
      const URL = `https://port-0-server-3szcb0g2blp3xl01q.sel5.cloudtype.app/course/delete/${id}`;
      const userToken = localStorage.getItem('userToken');
      const response = await axios.delete(URL, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }

    setIsModalOpen(false);
    router.replace('/tutoring/list');
  };

  const handleCopyClick = () => {
    copy(tutoring.inviteCode || '');
    alert('코드가 복사되었습니다');
  };

  return (
    <Layout noFooter>
      <Header path="/tutoring/list" />
      <Page>
        <TitleWrapper>
          학생 정보
          <InviteCodeButton type="button" onClick={handleCopyClick}>
            {tutoring.inviteCode}
          </InviteCodeButton>
        </TitleWrapper>
        <ContentWrapper>
          <ContentContainer>
            <Circle style={{ backgroundColor: tutoring.color }} />

            <ContentBox>
              <InputTitle>이름</InputTitle>
              <InputWrapper style={{ width: '9rem' }}>
                <Input>{tutoring.studentName}</Input>
              </InputWrapper>
            </ContentBox>

            <ContentBox>
              <InputTitle>나이</InputTitle>
              <UnitWrapper>
                <InputWrapper style={{ width: '9rem' }}>
                  <Input>{tutoring.studentAge}</Input>
                </InputWrapper>
                <Unit>세</Unit>
              </UnitWrapper>
            </ContentBox>
          </ContentContainer>

          <ContentContainer>
            <ContentBox>
              <InputTitle>학교</InputTitle>
              <InputWrapper style={{ width: '15.5rem' }}>
                <Input>{tutoring.studentSchool}</Input>
              </InputWrapper>
            </ContentBox>

            <SelectWrapper>
              <SelectBox>
                <Select disabled>
                  <option>{tutoring.studentGrade}</option>
                </Select>
              </SelectBox>
              <InputTitle>학년</InputTitle>
            </SelectWrapper>
          </ContentContainer>

          <ContentContainer>
            <ContentBox>
              <InputTitle>학생 휴대폰 번호</InputTitle>
              <InputWrapper style={{ width: '27.5rem' }}>
                <Input>{tutoring.studentPhone}</Input>
              </InputWrapper>
            </ContentBox>
          </ContentContainer>

          <ContentContainer>
            <ContentBox>
              <InputTitle>학부모 휴대폰 번호</InputTitle>
              <InputWrapper style={{ width: '27.5rem' }}>
                <Input>{tutoring.parentPhone}</Input>
              </InputWrapper>
            </ContentBox>
          </ContentContainer>
        </ContentWrapper>

        <TitleWrapper style={{ marginTop: `3.4rem` }}>과외 정보</TitleWrapper>
        <ContentWrapper>
          <ContentContainer>
            <ContentBox>
              <InputTitle>과목</InputTitle>
              <InputWrapper style={{ width: '15.5rem' }}>
                <Input>{tutoring.subject}</Input>
              </InputWrapper>
            </ContentBox>

            <ContentBox>
              <InputTitle>수업시간</InputTitle>
              <UnitWrapper>
                <InputWrapper style={{ width: '9rem' }}>
                  <Input>{tutoring.courseTime}</Input>
                </InputWrapper>
                <Unit>분</Unit>
              </UnitWrapper>
            </ContentBox>
          </ContentContainer>

          <ContentContainer>
            <ContentBox>
              <InputTitle>과외비</InputTitle>
              <InputWrapper style={{ width: '15.5rem' }}>
                <Input>{tutoring.coursePayment}</Input>
                <Unit>원</Unit>
              </InputWrapper>
            </ContentBox>

            <ContentBox>
              <InputTitle>입금회차</InputTitle>
              <SelectWrapper style={{ marginTop: `0.5rem` }}>
                <SelectBox>
                  <Select disabled>
                    <option>{tutoring.paymentCycle}</option>
                  </Select>
                </SelectBox>
                <InputTitle>회차</InputTitle>
              </SelectWrapper>
            </ContentBox>
          </ContentContainer>
        </ContentWrapper>

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
      </Page>
    </Layout>
  );
};

export default DetailTutoring;

const Page = styled.div`
  width: 100%;
  max-width: 37.5rem;
  padding: 0 2rem;

  background-color: ${theme.colors.backgroundColor};
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8.3rem;
  margin-left: 1rem;
  ${theme.fonts.headline};
`;

const InviteCodeButton = styled.button`
  border-radius: 2rem;
  margin-left: 1.8rem;
  padding: 0.5rem 0.7rem;
  text-align: center;

  background-color: ${theme.colors.lightGray};
  ${theme.fonts.text02_medium};
  color: ${theme.colors.darkGray};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3.8rem;

  margin-top: 1.5rem;
  padding: 3rem 2rem;
  border-radius: 1rem;

  background-color: ${theme.colors.white};
`;

const ContentContainer = styled.div`
  width: 29.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1.5rem;

  padding: 0 1rem;
`;

const ContentBox = styled.div``;

const Circle = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 100%;
`;

const InputTitle = styled.div`
  display: inline-block;
  ${theme.fonts.text01_medium};
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-top: 1.4rem;
  padding-bottom: 0.2rem;
  border-bottom: 0.1rem solid ${theme.colors.black};
`;

const Input = styled.div`
  width: 100%;
  height: 1.4rem;
  border: none;
  outline: none;

  ${theme.fonts.text03_regular};
`;

const UnitWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const Unit = styled.p`
  ${theme.fonts.text02_medium};
  padding-left: 0.3rem;
`;

const SelectWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
`;

const SelectBox = styled.div``;

const Select = styled.select`
  width: 4.8rem;
  height: 2.8rem;
  border-radius: 0.5rem;
  border: none;
  padding-left: 0.7rem;
  padding-bottom: 0.2rem;
  background-color: ${theme.colors.lightGray};
  ${theme.fonts.text01_medium};
  color: ${theme.colors.black};
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
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

  &:hover {
    background-color: ${theme.colors.mainColor};
    color: ${theme.colors.white};
  }
`;

const DeleteNoButton = styled.button`
  width: 13.3rem;
  height: 4rem;
  ${theme.fonts.title_regular};

  &:hover {
    background-color: ${theme.colors.mainColor};
    color: ${theme.colors.white};
  }
`;
