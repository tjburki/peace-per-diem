import { useState, useEffect } from 'react';

const useInfiniteScroll = (callback) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    callback();
  }, [isFetching]);

  function handleScroll() {
    if ((window.innerHeight + window.scrollY) < document.body.scrollHeight - 150 || isFetching) return;
    setIsFetching(true);
  }

  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;