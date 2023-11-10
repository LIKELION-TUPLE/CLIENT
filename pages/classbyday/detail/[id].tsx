import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from 'components/common/Layout';
import Detail from 'components/classbyday/Detail';
export interface idProps {
  id?: string;
}
const id = () => {
  const router = useRouter();
  const queryid = router.query.id;

  return (
    <Layout>
      <Detail id={queryid as string}></Detail>
    </Layout>
  );
};

export default id;
