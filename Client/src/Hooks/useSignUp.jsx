import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useSignUp = (url, inputs) => {
  // States
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.post(url, inputs, { withCredentials: true });
      if (res.data.success) {
        setData(res.data);
        toast.success(res.data.message);
        setLoading(false);
      } else {
        setError(res.data.message);
        toast.error(res.data.message);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message);
      setLoading(false);
    }
  };

  // UseEffect to fetch data from api (if needed, you can uncomment and use it)
  // useEffect(() => {
  //   fetchData();
  // }, [url, inputs]);

  // Return the data, error, and loading
  return { data, loading, error, fetchData };
};

export default useSignUp;
