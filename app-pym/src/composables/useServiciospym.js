
import { onMounted, reactive, toRefs } from "vue";
import { useQuasar } from "quasar";
import ServiciospymService from "src/services/ServiciospymService";

export default function () {
  const service = new ServiciospymService();
  const $q = useQuasar();

  const state = reactive({
    dataServpym: {
      resultGestion:0,
      list:[],

    },
  });

  onMounted(async () => {

  });

  const gestionServiciospym = async (dat) => {
    $q.loading.show();
    const resp = await service.gestionServiciospym(dat)
    state.dataServpym.resultGestion = resp.result.correcto;
    if(resp.result.correcto){
      $q.notify({
        message: resp.result.notificacion,
        color: "positive",
        icon:'done'
      });
      $q.loading.hide();
      return resp.result.datoadicional;
    }else{
      $q.notify({
        message: resp.result.notificacion,
        color: "negative",
        icon:'warning'
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
      icon:'done'
    });
  };

  return {
    ...toRefs(state),
    gestionServiciospym,
    listarServiciospym
  };
}
