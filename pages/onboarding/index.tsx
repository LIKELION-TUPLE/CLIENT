import Loading from 'components/Loading';
import Onboarding from 'components/Onboarding';
import React, { useEffect, useState } from 'react';

const index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return loading ? <Loading /> : <Onboarding />;
};

export default index;
