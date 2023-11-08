import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from 'components/common/Layout';
import Detail from 'components/_class/detail';
export interface idProps {
  id?: string | string[];
}
const id = () => {
  const router = useRouter();
  const queryid = router.query.id;

  return (
    <Layout>
      <Detail id={queryid}></Detail>
    </Layout>
  );
};

export default id;
