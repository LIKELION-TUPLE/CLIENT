import React from 'react';

import styled from 'styled-components';
import theme from '@src/styles/theme';
import { idProps } from 'pages/_class/detail/[id]';
const Detail = (props: idProps) => {
  const { id } = props;
  console.log(id);

  return <Title>수업일지</Title>;
};

export default Detail;
const Title = styled.h1`
  ${theme.fonts.headline};
`;
