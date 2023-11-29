import React, { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from '@src/styles/theme';
import Layout from '../common/Layout';
import { useRouter } from 'next/router';
import { OwnProps } from 'pages/signup/[userType]';
import { useSetRecoilState } from 'recoil';
import { userInfoSave } from 'atoms/selector';
import Header from 'components/common/Header';
import axios from 'axios';

interface Props {
  isClick?: boolean;
}

const Signup: React.FC<OwnProps> = ({ userType }) => {
  const type = userType === 'teacher' ? '선생님' : '학생';
  const [id, setId] = useState('');
  const [checkId, setCheckId] = useState(false);
  const [pw, setPw] = useState('');
  const [pwConfirm, setPwConfirm] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [phone, setPhone] = useState('');

  const [idValid, setIdValid] = useState(false);
  const [checkIdValid, setCheckIdValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [pwConfirmValid, setPwConfirmValid] = useState(false);
  const [dateValid, setDateValid] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [phoneValid, setPhoneValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  const router = useRouter();
  const setUserInfo = useSetRecoilState(userInfoSave);

  const handleCheckId = async () => {
    if (checkId) {
      try {
        const URL = `https://port-0-server-3szcb0g2blp3xl01q.sel5.cloudtype.app/signup/check`;
        const response = await axios.post(URL, {
          loginId: id,
        });

        if (response.data.isDuplicated === 'false') {
          setIdValid(true);
          setCheckId(false);
          setCheckIdValid(true);
          return;
        } else {
          alert('이미 사용 중인 아이디입니다');
          setId('');
          setCheckId(false);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleSignup = async () => {
    if (!notAllow) {
      try {
        const URL = `https://port-0-server-3szcb0g2blp3xl01q.sel5.cloudtype.app/signup/${userType}`;
        await axios.post(URL, {
          loginId: id,
          password: pw,
          name: name,
          phone: phone,
          birthDate: date,
        });
      } catch (error) {
        console.error('Error:', error);
      }

      router.replace('/signup/complete');
    }
  };

  const handleId = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
    if (e.target.value.length > 0) {
      setCheckId(true);
    } else {
      setCheckId(false);
    }
  };

  const handlePw = (e: ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(e.target.value)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  const handlePwConfirm = (e: ChangeEvent<HTMLInputElement>) => {
    setPwConfirm(e.target.value);
    if (e.target.value === pw) {
      setPwConfirmValid(true);
    } else {
      setPwConfirmValid(false);
    }
  };

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (0 < e.target.value.length && e.target.value.length <= 6) {
      setNameValid(true);
    } else {
      setNameValid(false);
    }
  };

  const handleDate = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
    if (e.target.value.length === 6) {
      setDateValid(true);
    } else {
      setDateValid(false);
    }
  };

  const handlePhone = (e: ChangeEvent<HTMLInputElement>) => {
    const phone = e.target.value;
    setPhone(phone);
    if (phone.length === 13 && phone[3] === '-' && phone[8] === '-') {
      setPhoneValid(true);
    } else {
      setPhoneValid(false);
    }
  };

  useEffect(() => {
    if (idValid && pwValid && pwConfirmValid && dateValid && nameValid && phoneValid) {
      setNotAllow(false);
      setUserInfo({ name: name, type: type });
      return;
    }
    setNotAllow(true);
  }, [idValid, pwValid, pwConfirmValid, dateValid, nameValid, phoneValid]);

  return (
    <Layout noFooter>
      <Header path={'signup/select'} />
      <Page>
        <TitleWrapper>{type} 회원가입</TitleWrapper>
        <ContentWrapper>
          <ContentContainer>
            <InputTitle>
              아이디 <Required>*</Required>
            </InputTitle>
            <InputWrapper>
              <Input
                type="text"
                placeholder="아이디를 입력해주세요"
                value={id}
                onChange={handleId}
                disabled={checkIdValid}></Input>
              <CheckIdButton type="submit" isClick={!checkId} onClick={handleCheckId}>
                중복확인
              </CheckIdButton>
            </InputWrapper>
            {!checkIdValid ? (
              <ErrorMessageWrapper style={{ color: theme.colors.red }}>아이디 중복확인을 해주세요</ErrorMessageWrapper>
            ) : (
              <ErrorMessageWrapper style={{ color: theme.colors.green }}>사용가능한 아이디입니다</ErrorMessageWrapper>
            )}
          </ContentContainer>

          <ContentContainer>
            <InputTitle>
              비밀번호 <Required>*</Required>
            </InputTitle>
            <InputWrapper>
              <Input type="password" placeholder="비밀번호를 입력해주세요" value={pw} onChange={handlePw}></Input>
            </InputWrapper>
            {pwValid ? (
              <ErrorMessageWrapper style={{ color: theme.colors.green }}>올바른 비밀번호입니다</ErrorMessageWrapper>
            ) : (
              <ErrorMessageWrapper style={{ color: theme.colors.red }}>
                영문, 숫자, 특수문자 포함 8자 이상
              </ErrorMessageWrapper>
            )}
          </ContentContainer>

          <ContentContainer>
            <InputTitle>
              비밀번호 확인 <Required>*</Required>
            </InputTitle>
            <InputWrapper>
              <Input
                type="password"
                placeholder="비밀번호를 다시 입력해주세요"
                value={pwConfirm}
                onChange={handlePwConfirm}></Input>
            </InputWrapper>
            {pwConfirmValid ? (
              <ErrorMessageWrapper style={{ color: theme.colors.green }}>비밀번호가 일치합니다</ErrorMessageWrapper>
            ) : (
              <ErrorMessageWrapper style={{ color: theme.colors.red }}>
                비밀번호가 일치하지 않습니다
              </ErrorMessageWrapper>
            )}
          </ContentContainer>

          <ContentContainer>
            <InputTitle>
              이름 <Required>*</Required>
            </InputTitle>
            <InputWrapper>
              <Input type="text" placeholder="이름을 입력해주세요" value={name} onChange={handleName}></Input>
            </InputWrapper>
            {nameValid ? (
              <ErrorMessageWrapper style={{ color: theme.colors.green }}>올바른 이름입니다</ErrorMessageWrapper>
            ) : (
              <ErrorMessageWrapper style={{ color: theme.colors.red }}>1 ~ 6자</ErrorMessageWrapper>
            )}
          </ContentContainer>

          <ContentContainer>
            <InputTitle>
              생년월일 <Required>*</Required>
            </InputTitle>
            <InputWrapper>
              <Input type="text" placeholder="생년월일을 입력해주세요" value={date} onChange={handleDate}></Input>
            </InputWrapper>
            {dateValid ? (
              <ErrorMessageWrapper style={{ color: theme.colors.green }}>올바른 생년월일입니다</ErrorMessageWrapper>
            ) : (
              <ErrorMessageWrapper style={{ color: theme.colors.red }}>YYMMDD</ErrorMessageWrapper>
            )}
          </ContentContainer>

          <ContentContainer>
            <InputTitle>
              휴대폰 번호 <Required>*</Required>
            </InputTitle>
            <InputWrapper>
              <Input type="text" placeholder="휴대폰 번호를 입력해주세요" value={phone} onChange={handlePhone}></Input>
            </InputWrapper>
            {phoneValid ? (
              <ErrorMessageWrapper style={{ color: theme.colors.green }}>올바른 휴대폰 번호입니다</ErrorMessageWrapper>
            ) : (
              <ErrorMessageWrapper style={{ color: theme.colors.red }}>010-XXXX-XXXX</ErrorMessageWrapper>
            )}
          </ContentContainer>
        </ContentWrapper>
        <ButtonWrapper>
          <BottomButton type="submit" isClick={notAllow} onClick={handleSignup}>
            회원가입
          </BottomButton>
        </ButtonWrapper>
      </Page>
    </Layout>
  );
};

export default Signup;

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
  gap: 2.3rem;

  height: 60.7 rem;
  margin-top: 1.5rem;
  padding: 3rem 2rem;
  border-radius: 1rem;

  background-color: ${theme.colors.white};
`;

const ContentContainer = styled.div``;

const InputTitle = styled.div`
  display: inline-block;
  ${theme.fonts.text01_medium};
`;

const Required = styled.span`
  color: ${theme.colors.red};
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  height: 3.4rem;
  padding-top: 0.6rem;
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

const CheckIdButton = styled.button<Props>`
  width: 6rem;
  border-radius: 2rem;
  padding: 0.5rem 0.7rem;
  text-align: center;
  background-color: ${({ isClick }) => (isClick ? theme.colors.lightGray : theme.colors.mainColor)};
  ${theme.fonts.text03_regular};
  color: ${({ isClick }) => (isClick ? theme.colors.darkGray : theme.colors.white)};

  cursor: pointer;
`;

const ErrorMessageWrapper = styled.div`
  margin-top: 0.2rem;

  ${theme.fonts.text03_regular};
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
