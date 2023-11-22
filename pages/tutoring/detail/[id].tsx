import DetailTutoring from 'components/tutoring/DetailTutoring';
import { useRouter } from 'next/router';
import React from 'react';
export interface idProps {
  id?: string;
}

const id = () => {
  const router = useRouter();
  const queryid = router.query.id;
  return <DetailTutoring id={queryid as string} />;
};

export default id;
