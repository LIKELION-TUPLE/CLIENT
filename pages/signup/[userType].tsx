import Singup from 'components/Singup';
import { useRouter } from 'next/router';
import React from 'react';

export interface OwnProps {
  userType?: string;
}

const userType = () => {
  const router = useRouter();
  const { userType } = router.query;
  return <Singup userType={userType as string} />;
};

export default userType;
