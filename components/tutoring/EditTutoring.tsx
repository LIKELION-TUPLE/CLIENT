import React, { ChangeEvent, useEffect, useState } from 'react';
import Layout from '../common/Layout';
import styled from 'styled-components';
import theme from '@src/styles/theme';
import Header from 'components/common/Header';
import { useRouter } from 'next/router';
import { CirclePicker, ColorResult } from 'react-color';
import Modal from 'react-modal';
import ReactModal from 'react-modal';
import axios from 'axios';
import { idProps } from 'pages/tutoring/edit/[id]';
import { tutoringInfo } from './ProgressTutoring';

interface Props {
  isClick?: boolean;
}

const EditTutoring: React.FC<idProps> = ({ id }) => {
  const yearOptions = [
    { value: '' },
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
    { value: 6 },
  ];
  const cycleOptions = [
    { value: '' },
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
    { value: 6 },
    { value: 7 },
    { value: 8 },
    { value: 9 },
    { value: 10 },
    { value: 11 },
    { value: 12 },
  ];

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
  const [name, setName] = useState(tutoring.studentName);
  const [age, setAge] = useState(String(tutoring.studentAge));
  const [school, setSchool] = useState(tutoring.studentSchool);
  const [grade, setGrade] = useState(String(tutoring.studentGrade));
  const [studentPhone, setStudentPhone] = useState(tutoring.studentPhone);
  const [parentPhone, setParentPhone] = useState(tutoring.parentPhone);
  const [subject, setSubject] = useState(tutoring.subject);
  const [time, setTime] = useState(String(tutoring.courseTime));
  const [payment, setPayment] = useState(String(tutoring.coursePayment));
  const [cycle, setCycle] = useState(String(tutoring.paymentCycle));

  const [nameValid, setNameValid] = useState(true);
  const [ageValid, setAgeValid] = useState(true);
  const [schoolValid, setSchoolValid] = useState(true);
  const [gradeValid, setGradeValid] = useState(true);
  const [subjectValid, setSubjectValid] = useState(true);
  const [timeValid, setTimeValid] = useState(true);
  const [paymentValid, setPaymentValid] = useState(true);
  const [cycleValid, setCycleValid] = useState(true);
  const [notAllow, setNotAllow] = useState(false);

  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(tutoring.color);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const router = useRouter();
  const beforePath = `/tutoring/detail/${id}`;

  const colorModalStyle: ReactModal.Styles = {
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
      width: '30rem',
      height: '20rem',
      zIndex: '150',
      position: 'absolute',
      top: modalPosition.top + 120,
      left: `50%`,
      transform: 'translate(-50%, -50%)',
      borderRadius: '10px',
      boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
      backgroundColor: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'auto',
    },
  };

  const saveModalStyle: ReactModal.Styles = {
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

  const handleColorChange = (color: ColorResult) => {
    setSelectedColor(color.hex);
    closeColorModal();
  };

  const openColorModal = (event: React.MouseEvent) => {
    const { clientX, clientY } = event;
    setModalPosition({ top: clientY, left: clientX });
    setIsColorModalOpen(true);
  };

  const closeColorModal = () => {
    setIsColorModalOpen(false);
  };

  const openSaveModal = () => {
    if (!notAllow) {
      setIsSaveModalOpen(true);
    }
  };

  const closeSaveModal = () => {
    setIsSaveModalOpen(false);
  };

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (0 < e.target.value.length && e.target.value.length <= 6) {
      setNameValid(true);
    } else {
      setNameValid(false);
    }
  };

  const handleAge = (e: ChangeEvent<HTMLInputElement>) => {
    setAge(e.target.value);
    const regex = /^[0-9\b]+$/;
    if (regex.test(e.target.value)) {
      setAgeValid(true);
    } else {
      setAgeValid(false);
    }
  };

  const handleSchool = (e: ChangeEvent<HTMLInputElement>) => {
    setSchool(e.target.value);
    if (0 < e.target.value.length) {
      setSchoolValid(true);
    } else {
      setSchoolValid(false);
    }
  };

  const handleGrade = (e: ChangeEvent<HTMLSelectElement>) => {
    setGrade(e.target.value);
    if (e.target.value !== '') {
      setGradeValid(true);
    } else {
      setGradeValid(false);
    }
  };

  const handleStudentPhone = (e: ChangeEvent<HTMLInputElement>) => {
    setStudentPhone(e.target.value);
  };

  const handleParentPhone = (e: ChangeEvent<HTMLInputElement>) => {
    setParentPhone(e.target.value);
  };

  const handleSubject = (e: ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
    if (0 < e.target.value.length && e.target.value.length <= 6) {
      setSubjectValid(true);
    } else {
      setSubjectValid(false);
    }
  };

  const handleTime = (e: ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
    const regex = /^[0-9\b]+$/;
    if (regex.test(e.target.value)) {
      setTimeValid(true);
    } else {
      setTimeValid(false);
    }
  };

  const handlePayment = (e: ChangeEvent<HTMLInputElement>) => {
    setPayment(e.target.value);
    const regex = /^[0-9\b]+$/;
    if (regex.test(e.target.value)) {
      setPaymentValid(true);
    } else {
      setPaymentValid(false);
    }
  };

  const handleDeopsit = (e: ChangeEvent<HTMLSelectElement>) => {
    setCycle(e.target.value);
    if (e.target.value !== '') {
      setCycleValid(true);
    } else {
      setCycleValid(false);
    }
  };

  const handleSave = async () => {
    try {
      const URL = `https://port-0-server-3szcb0g2blp3xl01q.sel5.cloudtype.app/course/update/${id}`;
      const userToken = localStorage.getItem('userToken');
      const response = await axios.put(
        URL,
        {
          color: selectedColor,
          studentName: name,
          studentAge: parseInt(age),
          studentSchool: school,
          studentGrade: parseInt(grade),
          studentPhone: studentPhone,
          parentPhone: parentPhone,
          subject: subject,
          courseTime: parseInt(time),
          coursePayment: parseInt(payment),
          paymentCycle: parseInt(cycle),
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
    router.replace(beforePath);
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

  useEffect(() => {
    setSelectedColor(tutoring.color);
    setName(tutoring.studentName);
    setAge(String(tutoring.studentAge));
    setSchool(tutoring.studentSchool);
    setGrade(String(tutoring.studentGrade));
    setStudentPhone(tutoring.studentPhone);
    setParentPhone(tutoring.parentPhone);
    setSubject(tutoring.subject);
    setTime(String(tutoring.courseTime));
    setPayment(String(tutoring.coursePayment));
    setCycle(String(tutoring.paymentCycle));
  }, [tutoring]);

  useEffect(() => {
    if (nameValid && ageValid && schoolValid && gradeValid && subjectValid && timeValid && paymentValid && cycleValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [nameValid, ageValid, schoolValid, gradeValid, subjectValid, timeValid, paymentValid, cycleValid]);

  return (
    <Layout noFooter>
      <Header path={beforePath} />
      <Page>
        <TitleWrapper>학생 정보</TitleWrapper>
        <ContentWrapper>
          <ContentContainer>
            <Circle style={{ backgroundColor: selectedColor }} onClick={openColorModal} />
            <Modal
              isOpen={isColorModalOpen}
              onRequestClose={closeColorModal}
              contentLabel="Color Picker Modal"
              style={colorModalStyle}>
              <CirclePicker color={selectedColor} onChange={handleColorChange} />
            </Modal>

            <ContentBox>
              <InputTitle>
                이름 <Required>*</Required>
              </InputTitle>
              <InputWrapper style={{ width: '9rem' }}>
                <Input type="text" placeholder="1 ~ 6자" value={name} onChange={handleName}></Input>
              </InputWrapper>
            </ContentBox>

            <ContentBox>
              <InputTitle>
                나이 <Required>*</Required>
              </InputTitle>
              <UnitWrapper>
                <InputWrapper style={{ width: '9rem' }}>
                  <Input type="text" placeholder="숫자로 입력해주세요" value={age} onChange={handleAge}></Input>
                </InputWrapper>
                <Unit>세</Unit>
              </UnitWrapper>
            </ContentBox>
          </ContentContainer>

          <ContentContainer>
            <ContentBox>
              <InputTitle>
                학교 <Required>*</Required>
              </InputTitle>
              <InputWrapper style={{ width: '15.5rem' }}>
                <Input type="text" value={school} onChange={handleSchool}></Input>
              </InputWrapper>
            </ContentBox>

            <SelectWrapper>
              <SelectBox>
                <Select value={grade} onChange={handleGrade}>
                  {yearOptions.map((option) => (
                    <option value={option.value}>{option.value}</option>
                  ))}
                </Select>
              </SelectBox>
              <InputTitle>
                학년 <Required>*</Required>
              </InputTitle>
            </SelectWrapper>
          </ContentContainer>

          <ContentContainer>
            <ContentBox>
              <InputTitle>학생 휴대폰 번호</InputTitle>
              <InputWrapper style={{ width: '27.5rem' }}>
                <Input type="text" value={studentPhone} onChange={handleStudentPhone}></Input>
              </InputWrapper>
            </ContentBox>
          </ContentContainer>

          <ContentContainer>
            <ContentBox>
              <InputTitle>학부모 휴대폰 번호</InputTitle>
              <InputWrapper style={{ width: '27.5rem' }}>
                <Input type="text" value={parentPhone} onChange={handleParentPhone}></Input>
              </InputWrapper>
            </ContentBox>
          </ContentContainer>
        </ContentWrapper>

        <TitleWrapper style={{ marginTop: `3.4rem` }}>과외 정보</TitleWrapper>
        <ContentWrapper>
          <ContentContainer>
            <ContentBox>
              <InputTitle>
                과목 <Required>*</Required>
              </InputTitle>
              <InputWrapper style={{ width: '15.5rem' }}>
                <Input type="text" placeholder="1 ~ 6자" value={subject} onChange={handleSubject}></Input>
              </InputWrapper>
            </ContentBox>

            <ContentBox>
              <InputTitle>
                수업시간 <Required>*</Required>
              </InputTitle>
              <UnitWrapper>
                <InputWrapper style={{ width: '9rem' }}>
                  <Input type="text" placeholder="숫자로 입력해주세요" value={time} onChange={handleTime}></Input>
                </InputWrapper>
                <Unit>분</Unit>
              </UnitWrapper>
            </ContentBox>
          </ContentContainer>

          <ContentContainer>
            <ContentBox>
              <InputTitle>
                과외비 <Required>*</Required>
              </InputTitle>
              <InputWrapper style={{ width: '15.5rem' }}>
                <Input type="text" placeholder="숫자로 입력해주세요" value={payment} onChange={handlePayment}></Input>
                <Unit>원</Unit>
              </InputWrapper>
            </ContentBox>

            <ContentBox>
              <InputTitle>
                입금회차 <Required>*</Required>
              </InputTitle>
              <SelectWrapper style={{ marginTop: `0.5rem` }}>
                <SelectBox>
                  <Select value={cycle} onChange={handleDeopsit}>
                    {cycleOptions.map((option) => (
                      <option value={option.value}>{option.value}</option>
                    ))}
                  </Select>
                </SelectBox>
                <InputTitle>회차</InputTitle>
              </SelectWrapper>
            </ContentBox>
          </ContentContainer>
        </ContentWrapper>

        <ButtonWrapper>
          <BottomButton type="submit" isClick={notAllow} onClick={openSaveModal}>
            저장
          </BottomButton>
          <Modal
            isOpen={isSaveModalOpen}
            onRequestClose={closeSaveModal}
            contentLabel="Check Delete"
            style={saveModalStyle}>
            <DeleteWrapper>
              <DeleteContainer>
                <DeleteTitle>정보 저장</DeleteTitle>
                <DeleteContent>
                  학생 정보와 과외 정보를
                  <br />
                  저장하시겠습니까?
                </DeleteContent>
              </DeleteContainer>
              <DeleteButton>
                <DeleteOkButton type="submit" onClick={handleSave}>
                  네
                </DeleteOkButton>
                <DeleteNoButton type="button" onClick={closeSaveModal}>
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

export default EditTutoring;

const Page = styled.div`
  width: 100%;
  max-width: 37.5rem;
  padding: 0 2rem;

  background-color: ${theme.colors.backgroundColor};
`;

const TitleWrapper = styled.div`
  margin-top: 8.3rem;
  margin-left: 1rem;
  ${theme.fonts.headline};
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
  cursor: pointer;
`;

const InputTitle = styled.div`
  display: inline-block;
  ${theme.fonts.text01_medium};
`;

const Required = styled.span`
  color: ${theme.colors.red};
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-top: 1.4rem;
  padding-bottom: 0.2rem;
  border-bottom: 0.1rem solid ${theme.colors.black};
`;

const Input = styled.input`
  width: 100%;
  height: 1.4rem;
  border: none;
  outline: none;

  ${theme.fonts.text03_regular};

  &::placeholder {
    color: ${theme.colors.gray};
    ${theme.fonts.text03_regular};
  }
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
  ${theme.fonts.text01_medium}

  &::checked {
    background-color: ${theme.colors.mainColor};
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BottomButton = styled.button<Props>`
  margin-top: 2rem;
  margin-bottom: 4.5rem;

  width: 30rem;
  height: 5rem;
  border-radius: 3rem;
  border: none;

  background-color: ${({ isClick }) => (isClick ? theme.colors.lightGray : theme.colors.mainColor)};
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
