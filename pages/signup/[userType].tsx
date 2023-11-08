import Signup from 'components/signup/Signup';
import { useRouter } from 'next/router';
import React from 'react';

export interface OwnProps {
  userType?: string;
}

const userType = () => {
  const router = useRouter();
  const { userType } = router.query;
  if (userType === 'teacher' || userType === 'student') return <Signup userType={userType as string} />;
};

export default userType;
