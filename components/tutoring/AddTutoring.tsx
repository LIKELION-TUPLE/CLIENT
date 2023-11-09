import React, { ChangeEvent, useEffect, useState } from 'react';
import Layout from '../common/Layout';
import styled from 'styled-components';
import theme from '@src/styles/theme';
import Header from 'components/common/Header';
import { useRouter } from 'next/router';

interface Props {
  isClick?: boolean;
}

const AddTutoring = () => {
  const yearOptions = [
    { value: '' },
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
    { value: 6 },
  ];
  const depositOptions = [
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

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [school, setSchool] = useState('');
  const [grade, setGrade] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [time, setTime] = useState('');
  const [fee, setFee] = useState('');
  const [deposit, setDeposit] = useState('');

  const [ageValid, setAgeValid] = useState(false);
  const [gradeValid, setGradeValid] = useState(false);
  const [studentPhoneValid, setStudenPhoneValid] = useState(false);
  const [parentPhoneValid, setParentPhoneValid] = useState(false);
  const [timeValid, setTimeValid] = useState(false);
  const [feeValid, setFeeValid] = useState(false);
  const [depositValid, setDepositValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  const router = useRouter();

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
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
    const phone = e.target.value;
    setStudentPhone(phone);
    if (phone.length === 13 && phone[3] === '-' && phone[8] === '-') {
      setStudenPhoneValid(true);
    } else {
      setStudenPhoneValid(false);
    }
  };

  const handleParentPhone = (e: ChangeEvent<HTMLInputElement>) => {
    const phone = e.target.value;
    setParentPhone(phone);
    if (phone.length === 13 && phone[3] === '-' && phone[8] === '-') {
      setParentPhoneValid(true);
    } else {
      setParentPhoneValid(false);
    }
  };

  const handleSubject = (e: ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
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

  const handleFee = (e: ChangeEvent<HTMLInputElement>) => {
    setFee(e.target.value);
    const regex = /^[0-9\b]+$/;
    if (regex.test(e.target.value)) {
      setFeeValid(true);
    } else {
      setFeeValid(false);
    }
  };

  const handleDeopsit = (e: ChangeEvent<HTMLSelectElement>) => {
    setDeposit(e.target.value);
    if (e.target.value !== '') {
      setDepositValid(true);
    } else {
      setDepositValid(false);
    }
  };

  const handleSave = () => {
    if (!notAllow) {
      const tutoringInfo = {
        name: name,
        age: age,
        school: school,
        grade: grade,
        studentPhone: studentPhone,
        parentPhone: parentPhone,
        subject: subject,
        time: time,
        fee: fee,
        deposit: deposit,
      };
      console.log(tutoringInfo);
      router.replace('/completeaddtutoring');
    }
  };

  useEffect(() => {
    if (
      name.length > 0 &&
      ageValid &&
      school.length > 0 &&
      gradeValid &&
      studentPhoneValid &&
      parentPhoneValid &&
      subject.length > 0 &&
      timeValid &&
      feeValid &&
      depositValid
    ) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [
    name,
    ageValid,
    school,
    gradeValid,
    studentPhoneValid,
    parentPhoneValid,
    subject,
    timeValid,
    feeValid,
    depositValid,
  ]);

  return (
    <Layout noFooter>
      <Header />
      <Page>
        <TitleWrapper>학생 정보</TitleWrapper>
        <ContentWrapper>
          <ContentContainer>
            <Circle />

            <ContentBox>
              <InputTitle>
                이름 <Required>*</Required>
              </InputTitle>
              <InputWrapper style={{ width: '9rem' }}>
                <Input type="text" value={name} onChange={handleName}></Input>
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
                <Input type="text" value={subject} onChange={handleSubject}></Input>
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
                <Input type="text" placeholder="숫자로 입력해주세요" value={fee} onChange={handleFee}></Input>
                <Unit>원</Unit>
              </InputWrapper>
            </ContentBox>

            <ContentBox>
              <InputTitle>
                입금회차 <Required>*</Required>
              </InputTitle>
              <SelectWrapper style={{ marginTop: `0.5rem` }}>
                <SelectBox>
                  <Select value={deposit} onChange={handleDeopsit}>
                    {depositOptions.map((option) => (
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
          <BottomButton type="submit" isClick={notAllow} onClick={handleSave}>
            저장
          </BottomButton>
        </ButtonWrapper>
      </Page>
    </Layout>
  );
};

export default AddTutoring;

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
  background-color: ${theme.colors.kakao};
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
