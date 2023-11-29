import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from 'components/common/Layout';
import Detail from 'components/classbyday/Detail';
export interface idProps {
  id: number;
}
const id = () => {
  const router = useRouter();
  const queryid = Number(router.query.id);

  return (
    <Layout>
      <Detail id={queryid as number}></Detail>
    </Layout>
  );
};

export default id;
