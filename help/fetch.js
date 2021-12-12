import { useState, useEffect } from "react";
import axios from "axios";


export default function UseFetch(requestData, method, path) {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .post(`https://bundle-backend.herokuapp.com${path}`, requestData)
      .then((res) => {
        setResponse(res.data);
        setLoading(false);
      })
      .catch(() => {
        setHasError(true);
        setLoading(false);
      });
  }, [path]);
  return [response, loading, hasError];
}
