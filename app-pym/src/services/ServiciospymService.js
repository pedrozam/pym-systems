import { api } from "src/boot/axios";

class ServiciospymService {
  async gestionServiciospym(dat) {
    try {
      const { data } = await api.post("/api/servicios/gestionServiciospym", dat);
      return data;
    } catch (error) {
      console.log(error);

    }
  }
  async listarServiciospym(estado) {
    try {
      const { data } = await api.get(`/api/servicios/listarServiciospym/${estado}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async listarTecnologias(estado) {
    try {
      const { data } = await api.get(`/api/servicios/listarTecnologias/${estado}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }


}

export default ServiciospymService;
