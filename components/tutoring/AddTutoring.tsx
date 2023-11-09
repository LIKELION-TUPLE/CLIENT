import React, { ChangeEvent, useEffect, useState } from 'react';
import Layout from '../common/Layout';
import styled from 'styled-components';
import theme from '@src/styles/theme';
import Header from 'components/common/Header';

const AddTutoring = () => {
  const yearOptions = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 6 }];
  const depositOptions = [
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

  return (
    <Layout noFooter>
      <Header />
      <Page>
        <TitleWrapper>학생 정보</TitleWrapper>
        <ContentWrapper>
          <ContentContainer>
            <Circle />

            <ContentBox>
              <InputTitle>이름</InputTitle>
              <InputWrapper style={{ width: '9rem' }}>
                <Input type="text" placeholder="이름을 입력해주세요"></Input>
              </InputWrapper>
            </ContentBox>

            <ContentBox>
              <InputTitle>나이</InputTitle>
              <UnitWrapper>
                <InputWrapper style={{ width: '9rem' }}>
                  <Input type="text" placeholder="숫자로 입력해주세요"></Input>
                </InputWrapper>
                <Unit>세</Unit>
              </UnitWrapper>
            </ContentBox>
          </ContentContainer>

          <ContentContainer>
            <ContentBox>
              <InputTitle>학교</InputTitle>
              <InputWrapper style={{ width: '15.5rem' }}>
                <Input type="text" placeholder="학교를 입력해주세요"></Input>
              </InputWrapper>
            </ContentBox>

            <SelectWrapper>
              <SelectBox>
                <Select name="year">
                  {yearOptions.map((option) => (
                    <option value={option.value}>{option.value}</option>
                  ))}
                </Select>
              </SelectBox>
              <InputTitle>학년</InputTitle>
            </SelectWrapper>
          </ContentContainer>

          <ContentContainer>
            <ContentBox>
              <InputTitle>학생 휴대폰 번호</InputTitle>
              <InputWrapper style={{ width: '27.5rem' }}>
                <Input type="text" placeholder="휴대폰 번호를 입력해주세요 (010-XXXX-XXXX)"></Input>
              </InputWrapper>
            </ContentBox>
          </ContentContainer>

          <ContentContainer>
            <ContentBox>
              <InputTitle>학부모 휴대폰 번호</InputTitle>
              <InputWrapper style={{ width: '27.5rem' }}>
                <Input type="text" placeholder="휴대폰 번호를 입력해주세요 (010-XXXX-XXXX)"></Input>
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
                <Input type="text" placeholder="과목을 입력해주세요"></Input>
              </InputWrapper>
            </ContentBox>

            <ContentBox>
              <InputTitle>수업시간</InputTitle>
              <UnitWrapper>
                <InputWrapper style={{ width: '9rem' }}>
                  <Input type="text" placeholder="숫자로 입력해주세요"></Input>
                </InputWrapper>
                <Unit>분</Unit>
              </UnitWrapper>
            </ContentBox>
          </ContentContainer>

          <ContentContainer>
            <ContentBox>
              <InputTitle>과외비</InputTitle>
              <InputWrapper style={{ width: '15.5rem' }}>
                <Input type="text" placeholder="숫자로 입력해주세요"></Input>
                <Unit>원</Unit>
              </InputWrapper>
            </ContentBox>

            <ContentBox>
              <InputTitle>입금회차</InputTitle>
              <SelectWrapper style={{ marginTop: `1.2rem` }}>
                <SelectBox>
                  <Select name="year">
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
          <BottomButton type="submit">저장</BottomButton>
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
  ${theme.fonts.text01_medium};
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
  padding: 0.3rem;
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

const BottomButton = styled.button`
  margin-top: 2rem;
  margin-bottom: 4.5em;

  width: 30rem;
  height: 5rem;
  border-radius: 3rem;
  border: none;

  //background-color: ${({ isClick }) => (isClick ? theme.colors.lightGray : theme.colors.mainColor)};
  color: ${theme.colors.white};
  ${theme.fonts.title_bold};

  cursor: pointer;
`;
