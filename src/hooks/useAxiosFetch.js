import { useState, useEffect } from "react";
import axios from "axios";

const useAxiosFetch = (dataUrl) => {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isPending, setIsPending] = useState(true);

  let JWT = "";
  let login_status = JSON.parse(localStorage.getItem("login"));
  if (login_status && login_status.login) {
    JWT = login_status.token;
  }

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();

    const fetchData = async (url) => {
      setIsPending(true);
      try {
        const response = await axios.get(url, {
          cancelToken: source.token,
          headers: { Authorization: `Bearer ${JWT}` },
        });
        if (isMounted) {
          setData(response.data);
          setFetchError(null);
        }
      } catch (err) {
        if (isMounted) {
          setFetchError(err.message);
          setData([]);
        }
      } finally {
        isMounted && setIsPending(false);
      }
    };

    fetchData(dataUrl);

    const cleanUp = () => {
      isMounted = false;
      source.cancel();
    };

    return cleanUp;
  }, [dataUrl]);

  return { data, fetchError, isPending };
};

export default useAxiosFetch;
