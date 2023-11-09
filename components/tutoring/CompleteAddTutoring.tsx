import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { tutoringInfo } from 'atoms/atom';
import Layout from 'components/common/Layout';
import theme from '@src/styles/theme';
import copy from 'copy-to-clipboard';

const inviteCode = '코드 1235';

const CompleteAddTutoring = () => {
  const { name, subject } = useRecoilValue(tutoringInfo);

  const handleCopyClick = () => {
    copy(inviteCode);
    alert('코드가 복사되었습니다');
  };

  return (
    <Layout noFooter>
      <Page>
        <CompleteWrapper>
          <TitleWrapper>
            김인강 선생님
            <br /> [ {name} 학생 | {subject} ]
            <br />
            과외가 추가되었습니다
          </TitleWrapper>
          <InviteCode onClick={handleCopyClick}>초대 코드 1235</InviteCode>
          <InviteContent>초대 코드를 복사해 학생에게 보내주세요</InviteContent>
        </CompleteWrapper>
        <BottomButton>확인</BottomButton>
      </Page>
    </Layout>
  );
};

export default CompleteAddTutoring;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 37.5rem;

  background-color: ${theme.colors.backgroundColor};
`;

const CompleteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const TitleWrapper = styled.div`
  text-align: center;
  ${theme.fonts.subheadline};
`;

const InviteCode = styled.button`
  margin-top: 3rem;
  padding: 1.2rem 7.5rem;
  border-radius: 3rem;
  background-color: ${theme.colors.lightGray};
  color: ${theme.colors.mainColor};
  ${theme.fonts.title_bold}

  cursor: pointer;
`;

const InviteContent = styled.h1`
  margin-top: 1.5rem;
  color: ${theme.colors.darkGray};
  ${theme.fonts.text01_medium}
`;

const BottomButton = styled.button`
  margin-bottom: 4.5rem;

  width: 30rem;
  height: 5rem;
  border-radius: 3rem;
  border: none;

  background-color: ${theme.colors.mainColor};
  color: ${theme.colors.white};
  ${theme.fonts.title_bold};

  cursor: pointer;
`;
