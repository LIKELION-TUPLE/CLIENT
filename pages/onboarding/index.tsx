import Loading from 'components/onboarding/Loading';
import Onboarding from 'components/onboarding/Onboarding';
import React, { useEffect, useState } from 'react';

const index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return loading ? <Loading /> : <Onboarding />;
};

export default index;
