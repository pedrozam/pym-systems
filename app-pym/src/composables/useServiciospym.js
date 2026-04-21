import { onMounted, reactive, toRefs } from "vue";
import { useQuasar } from "quasar";
import ServiciospymService from "src/services/ServiciospymService";

export default function () {
  const service = new ServiciospymService();
  const $q = useQuasar();

  const state = reactive({
    dataServpym: {
      resultGestion: 0,
      list: [],
      listTech: [],
      // Propiedades computadas para tecnologías filtradas
      frontendTechs: [],
      backendTechs: [],
      databaseTechs: [],
      devToolsTechs: [],
    },
  });

  // Función para actualizar las tecnologías filtradas
  const updateFilteredTechs = () => {
    const techs = state.dataServpym.listTech || [];

    state.dataServpym.frontendTechs = techs
      .filter(tech => tech.nombre_tipo_tecnologia === 'Frontend' && tech.estado === 'ACTIVO')
      .sort((a, b) => (a.orden || 0) - (b.orden || 0));

    state.dataServpym.backendTechs = techs
      .filter(tech => tech.nombre_tipo_tecnologia === 'Backend' && tech.estado === 'ACTIVO')
      .sort((a, b) => (a.orden || 0) - (b.orden || 0));

    state.dataServpym.databaseTechs = techs
      .filter(tech => tech.nombre_tipo_tecnologia === 'Base de Datos' && tech.estado === 'ACTIVO')
      .sort((a, b) => (a.orden || 0) - (b.orden || 0));

    state.dataServpym.devToolsTechs = techs
      .filter(tech => tech.nombre_tipo_tecnologia === 'DevOps & Herramientas' && tech.estado === 'ACTIVO')
      .sort((a, b) => (a.orden || 0) - (b.orden || 0));
  };

  onMounted(async () => {
    // Inicialización si es necesario
  });

  const gestionServiciospym = async (dat) => {
    $q.loading.show();
    const resp = await service.gestionServiciospym(dat);
    state.dataServpym.resultGestion = resp.result.correcto;
    if (resp.result.correcto) {
      $q.notify({
        message: resp.result.notificacion,
        color: "positive",
        icon: 'done'
      });
      $q.loading.hide();
      return resp.result.datoadicional;
    } else {
      $q.notify({
        message: resp.result.notificacion,
        color: "negative",
        icon: 'warning'
      });
      $q.loading.hide();
      return 0;
    }
  };

  const listarServiciospym = async (estado) => {
    $q.loading.show();
    const resp = await service.listarServiciospym(estado);
    state.dataServpym.list = resp.datos;
    $q.loading.hide();
    $q.notify({
      message: "Se obtuvo la lista de servicios de PyM.",
      color: "positive",
      icon: 'done'
    });
  };

  const listarTecnologias = async (estado) => {
    $q.loading.show();
    const resp = await service.listarTecnologias(estado);
    state.dataServpym.listTech = resp.datos;
    // Actualizar las tecnologías filtradas después de cargar los datos
    updateFilteredTechs();
    $q.loading.hide();
    $q.notify({
      message: "Se obtuvo la lista de tecnologías PyM.",
      color: "positive",
      icon: 'done'
    });
  };

  const gestionContactoWaap = async (dat) => {
    $q.loading.show();
    const resp = await service.gestionContactoWaap(dat);
    state.dataServpym.resultGestion = resp.result.correcto;
    if (resp.result.correcto) {
      $q.notify({
        message: resp.result.notificacion,
        color: "positive",
        icon: 'done'
      });
      $q.loading.hide();
      return resp.result.datoadicional;
    } else {
      $q.notify({
        message: resp.result.notificacion,
        color: "negative",
        icon: 'warning'
      });
      $q.loading.hide();
      return 0;
    }
  };

  return {
    ...toRefs(state),
    gestionServiciospym,
    listarServiciospym,
    listarTecnologias,
    updateFilteredTechs,
    gestionContactoWaap
  };
}
