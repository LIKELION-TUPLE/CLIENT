import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from 'components/common/Layout';
import DetailClass from 'components/classbyday/DetailClass';
export interface idProps {
  id?: string;
}
const id = () => {
  const router = useRouter();
  const queryid = router.query.id;

  return (
    <Layout noFooter>
      <DetailClass id={queryid as string}></DetailClass>
    </Layout>
  );
};

export default id;
