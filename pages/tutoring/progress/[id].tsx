import React from 'react';
import { useRouter } from 'next/router';
import Layout from 'components/common/Layout';
import ProgressTutoring from 'components/tutoring/ProgressTutoring';
export interface idProps {
  id?: string;
}
const id = () => {
  const router = useRouter();
  const queryid = router.query.id;
  return (
    <Layout>
      <ProgressTutoring id={queryid as string} />
    </Layout>
  );
};

export default id;
