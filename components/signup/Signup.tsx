import React, { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from '@src/styles/theme';
import Layout from '../common/Layout';
import { dummyUsers } from 'data/dummy';
import { useRouter } from 'next/router';
import { OwnProps } from 'pages/signup/[userType]';
import { useSetRecoilState } from 'recoil';
import { userNameSave, userTypeSave } from 'atoms/selector';
import Header from 'components/common/Header';

interface Props {
  isClick?: boolean;
}

const Signup: React.FC<OwnProps> = ({ userType }) => {
  const type = userType === 'teacher' ? '선생님' : '학생';
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [pwConfirm, setPwConfirm] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [phone, setPhone] = useState('');

  const [idValid, setIdValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [pwConfirmValid, setPwConfirmValid] = useState(false);
  const [dateValid, setDateValid] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [phoneValid, setPhoneValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  const router = useRouter();
  const setUserName = useSetRecoilState(userNameSave);
  const setUserType = useSetRecoilState(userTypeSave);

  const handleSignup = () => {
    if (!notAllow) {
      router.replace('/completesignup');
    }
  };

  const handleId = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);

    let flag = true;
    dummyUsers.users.forEach((user) => {
      if (e.target.value === user.id) {
        flag = false;
      }
    });

    if (flag) {
      setIdValid(true);
    } else {
      setIdValid(false);
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
    if (e.target.value.length <= 5) {
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
      setUserName(name);
      setUserType(type);
      return;
    }
    setNotAllow(true);
  }, [idValid, pwValid, pwConfirmValid, dateValid, nameValid, phoneValid]);

  return (
    <Layout noFooter>
      <Header path={'selectsignup'} />
      <Page>
        <TitleWrapper>{type} 회원가입</TitleWrapper>
        <ContentWrapper>
          <ContentContainer>
            <InputTitle>아이디</InputTitle>
            <InputWrapper>
              <Input type="text" placeholder="아이디를 입력해주세요" value={id} onChange={handleId}></Input>
            </InputWrapper>
            <ErrorMessageWrapper>
              {!idValid && id.length > 0 && <div>이미 사용중인 아이디입니다</div>}
            </ErrorMessageWrapper>
          </ContentContainer>

          <ContentContainer>
            <InputTitle>비밀번호</InputTitle>
            <InputWrapper>
              <Input
                type="password"
                placeholder="비밀번호를 입력해주세요 (영문, 숫자, 특수문자 포함 8자 이상)"
                value={pw}
                onChange={handlePw}></Input>
            </InputWrapper>
            <ErrorMessageWrapper>
              {!pwValid && pw.length > 0 && <div>영문, 숫자, 특수문자 포함 8자 이상</div>}
            </ErrorMessageWrapper>
          </ContentContainer>

          <ContentContainer>
            <InputTitle>비밀번호 확인</InputTitle>
            <InputWrapper>
              <Input
                type="password"
                placeholder="비밀번호를 다시 입력해주세요"
                value={pwConfirm}
                onChange={handlePwConfirm}></Input>
            </InputWrapper>
            <ErrorMessageWrapper>
              {!pwConfirmValid && pwConfirm.length > 0 && <div>비밀번호가 일치하지 않습니다</div>}
            </ErrorMessageWrapper>
          </ContentContainer>

          <ContentContainer>
            <InputTitle>이름</InputTitle>
            <InputWrapper>
              <Input
                type="text"
                placeholder="이름을 입력해주세요 (5자 이하)"
                value={name}
                onChange={handleName}></Input>
            </InputWrapper>
            <ErrorMessageWrapper>{!nameValid && name.length > 0 && <div>5자 이하</div>}</ErrorMessageWrapper>
          </ContentContainer>

          <ContentContainer>
            <InputTitle>생년월일</InputTitle>
            <InputWrapper>
              <Input
                type="text"
                placeholder="생년월일을 입력해주세요 (YYMMDD)"
                value={date}
                onChange={handleDate}></Input>
            </InputWrapper>
            <ErrorMessageWrapper>{!dateValid && date.length > 0 && <div>YYMMDD</div>}</ErrorMessageWrapper>
          </ContentContainer>

          <ContentContainer>
            <InputTitle>휴대폰 번호</InputTitle>
            <InputWrapper>
              <Input
                type="text"
                placeholder="휴대폰 번호를 입력해주세요 (010-XXXX-XXXX)"
                value={phone}
                onChange={handlePhone}></Input>
            </InputWrapper>
            <ErrorMessageWrapper>{!phoneValid && phone.length > 0 && <div>010-XXXX-XXXX</div>}</ErrorMessageWrapper>
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
  gap: 3.8rem;

  height: 51.4rem;
  margin-top: 1.5rem;
  padding: 3rem 2rem;
  border-radius: 1rem;

  background-color: ${theme.colors.white};
`;

const ContentContainer = styled.div``;

const InputTitle = styled.div`
  ${theme.fonts.text01_medium};
`;

const InputWrapper = styled.div`
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

const ErrorMessageWrapper = styled.div`
  margin-top: 0.2rem;

  color: #ec5959;
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
