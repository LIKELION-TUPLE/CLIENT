import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from 'components/common/Layout';
import DetailClass from 'components/classbyday/DetailClass';
export interface idProps {
  id: number;
}
const id = () => {
  const router = useRouter();
  const queryid = Number(router.query.id);

  return (
    <Layout noFooter>
      <DetailClass id={queryid as number}></DetailClass>
    </Layout>
  );
};

export default id;
