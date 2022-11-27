import axios from "axios";
import { BRANDS_SERVICE_URL } from "../helpers/constants";

const GetAll = async () => {
  try {
    const resp = await axios.get(BRANDS_SERVICE_URL);
    return resp;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export { GetAll };
