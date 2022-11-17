import axios from "axios";
import { buildURL } from "../helpers/buildURL";
import { ITEMS_SERVICE_URL } from "../helpers/constants";

const GetAll = async () => {
  try {
    // const url = buildURL(ITEMS_SERVICE_URL,true)
    const resp = await axios.get(ITEMS_SERVICE_URL);
    return resp;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const GetAllFiltered = async ()=>{
  try {
    const url = buildURL(ITEMS_SERVICE_URL,true)
    const resp = await axios.get(url);
    return resp.data.length;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

const GetPerView = async () => {
  try {
    const url = buildURL(ITEMS_SERVICE_URL,false)
    const resp = await axios.get(url);
    return resp;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export { GetAll , GetPerView,GetAllFiltered };
