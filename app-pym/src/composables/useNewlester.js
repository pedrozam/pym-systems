import { onMounted, reactive, toRefs } from "vue";
import { useQuasar } from "quasar";
import NewlesterService from "src/services/NewlesterService";

export default function () {
  const service = new NewlesterService();
  const $q = useQuasar();

  const state = reactive({
    dataNewlester: {
      subscribeSuccess: false,
      resultGestion: [],
      list: [],
      // Datos para la suscripción
      suscripcionData: {
        transaccion: 'CREAR',
        estado: 'INICIAL',
        correo: null,
        id_usuario_sesion: null,
        ci_usuario_sesion: null,
        id_suscriptor: null,
        id_usuario: null
      }
    },
  });

  onMounted(async () => {
    // Aquí puedes cargar datos iniciales si es necesario
    // Por ejemplo, obtener id_usuario_sesion desde el store o localStorage
  });

  const gestionNewlester = async (dat) => {
    $q.loading.show();
    const resp = await service.gestionNewlester(dat);

    if (resp && resp.result) {
      state.dataNewlester.subscribeSuccess = resp.result.correcto;
      state.dataNewlester.resultGestion = resp.result;

      if (resp.result.correcto) {
        $q.notify({
          message: resp.result.notificacion || "Suscripción exitosa",
          color: "positive",
          icon: 'done'
        });
        $q.loading.hide();
        return resp.result;
      } else {
        $q.notify({
          message: resp.result.notificacion || "Error en la suscripción",
          color: "negative",
          icon: 'warning'
        });
        $q.loading.hide();
        return null;
      }
    } else {
      $q.notify({
        message: "Error al procesar la solicitud",
        color: "negative",
        icon: 'warning'
      });
      $q.loading.hide();
      return null;
    }
  };

  const listarNewlester = async (estado) => {
    $q.loading.show();
    const resp = await service.listarNewlester(estado);
    if (resp && resp.datos) {
      state.dataNewlester.list = resp.datos;
      $q.notify({
        message: "Se obtuvo la lista de suscriptores.",
        color: "positive",
        icon: 'done'
      });
    }
    $q.loading.hide();
  };

  // Función para limpiar los datos de suscripción después del éxito
  const limpiarDatosSuscripcion = () => {
    state.dataNewlester.suscripcionData.correo = null;
    state.dataNewlester.subscribeSuccess = false;
  };

  // Función para resetear el estado de éxito
  const resetearSuccess = () => {
    state.dataNewlester.subscribeSuccess = false;
  };

  return {
    ...toRefs(state),
    gestionNewlester,
    listarNewlester,
    limpiarDatosSuscripcion,
    resetearSuccess
  };
}
