import { api } from "src/boot/axios";

class NewlesterService {
  async gestionNewlester(dat) {
    try {
      const { data } = await api.post("/api/newlester/gestionNewlester", dat);
      return data;
    } catch (error) {
      console.log(error);

    }
  }
  async listarNewlester(estado) {
    try {
      const { data } = await api.get(`/api/newlester/listarNewlester/${estado}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }


}

export default NewlesterService;
