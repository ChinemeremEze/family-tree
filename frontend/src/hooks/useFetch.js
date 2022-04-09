import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(url);
        }
      })
      .then(setData)
      .catch((err) => {
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [url]);

  return { data, error, loading };
};