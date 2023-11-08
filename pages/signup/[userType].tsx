import Singup from 'components/signup/Singup';
import { useRouter } from 'next/router';
import React from 'react';

export interface OwnProps {
  userType?: string;
}

const userType = () => {
  const router = useRouter();
  const { userType } = router.query;
  if (userType === 'teacher' || userType === 'student') return <Singup userType={userType} />;
};

export default userType;
