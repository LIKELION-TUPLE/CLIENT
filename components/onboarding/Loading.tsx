import React from 'react';
import Layout from '../common/Layout';
import styled from 'styled-components';
import theme from '@src/styles/theme';
import { TupleLogoIcon } from 'asset';

const Loading = () => {
  return (
    <Layout noFooter>
      <Page>
        <TupleLogoIcon alt="튜플로고" width={120} height={165} />
      </Page>
    </Layout>
  );
};

export default Loading;

const Page = styled.div`
  width: 37.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: ${theme.colors.backgroundColor};
`;
