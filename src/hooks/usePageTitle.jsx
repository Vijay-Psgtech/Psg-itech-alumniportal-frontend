import React, { useEffect } from 'react'

const usePageTitle = (title) => {
  useEffect(() => {
    document.title = `${title} | PSG iTech Alumni Association`;
  }, [title]);
};

export default usePageTitle