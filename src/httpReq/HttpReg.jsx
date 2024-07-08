/* eslint-disable no-useless-catch */
import { useContext } from "react";
import useAxios from "../hooks/useAxios";
import { LoadingContext } from "../context";

export default function HttpReg() {
  const { setIsLoading } = useContext(LoadingContext);
  const { api } = useAxios();

  const get = async (url) => {
    setIsLoading(true);
    try {
      const response = await api.get(url);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  const post = async (url, data) => {
    setIsLoading(true);

    try {
      const response = await api.post(url, data);

      return response;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  const put = async (url, data) => {
    setIsLoading(true);

    try {
      const response = await api.put(url, data);

      return response;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  const remove = async (url) => {
    setIsLoading(true);

    try {
      const response = await api.delete(url);

      return response;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { get, post, put, remove };
}
