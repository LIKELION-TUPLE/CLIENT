import React from 'react';
import Layout from '../common/Layout';
import styled from 'styled-components';
import theme from '@src/styles/theme';
import { TupleLogoImage } from 'asset';
import Image from 'next/image';

const Loading = () => {
  return (
    <Layout noFooter>
      <Page>
        <Image src={TupleLogoImage} alt="튜플로고" width={335} height={200} />
        <LoadingContent>로딩 중... 잠시만 기다려주세요</LoadingContent>
      </Page>
    </Layout>
  );
};

export default Loading;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;

  background-color: ${theme.colors.mainColor};
`;

const LoadingContent = styled.h1`
  margin-top: 5rem;

  font-style: ${theme.fonts.subheadline};
  color: ${theme.colors.white};
`;
