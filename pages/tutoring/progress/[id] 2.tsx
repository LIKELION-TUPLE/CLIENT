import React from 'react';
import { useRouter } from 'next/router';
import Layout from 'components/common/Layout';
import Progress from 'components/progress/Progress';
export interface idProps {
  id?: string;
}
const id = () => {
  const router = useRouter();
  const queryid = router.query.id;
  return (
    <Layout>
      <Progress id={queryid as string} />
    </Layout>
  );
};

export default id;
