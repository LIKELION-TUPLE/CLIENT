import React from 'react';
import { useRouter } from 'next/router';
import Layout from 'components/common/Layout';
import Detail from 'components/_class/detail';
export interface idProps {
  userid?: string;
}
const id = () => {
  const router = useRouter();
  const { id } = router.query();
  return (
    <Layout>
      <Detail userid={id as string}></Detail>
    </Layout>
  );
};

export default id;
