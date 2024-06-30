/* eslint-disable no-useless-catch */
import useAxios from '../hooks/useAxios';


export default function HttpReg() {
    const { api } = useAxios();

  const get = async (url) => {
    
    try {
        console.log("skjgdg");
      const response = await api.get(url);
      return response;
    } catch (error) {
      throw error;
    }
  };
  const post = async (url,data) => {
    
    try {
      const response = await api.post(url,data);
      
      return response;
    } catch (error) {
      throw error;
    }
  };
  const put = async (url,data) => {
    
    try {
      const response = await api.put(url,data);

      
      return response;
    } catch (error) {
      throw error;
    }
  };
  const remove = async (url) => {
    
    try {
      const response = await api.delete(url);
      
      
      return response;
    } catch (error) {
      throw error;
    }
  };

  return { get,post,put ,remove};

}
