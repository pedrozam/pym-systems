<template>
  <div class="flex flex-col gap-1" :class="{ 'modern-container': design === 'modern' }">
    <!-- ==================== TIPO: FECHA ==================== -->
    <template v-if="tipo === 'fecha'">
      <div class="relative w-full">
        <label v-if="etiqueta && design !== 'modern'" class="text-xs font-medium text-[#c0e0e8]" :class="{ 'required-field': required }">
          {{ etiqueta }}
        </label>
        <div class="relative" :class="{ 'modern-input-container': design === 'modern' }">
          <q-input
            :outlined="design !== 'modern'"
            :borderless="design === 'modern'"
            dense
            dark
            :model-value="fechaDisplay"
            :readonly="deshabilitar"
            :placeholder="!etiqueta ? 'Seleccionar fecha' : ''"
            :class="design === 'modern' ? 'modern-q-input' : inputClasses"
            :bg-color="design === 'modern' ? 'transparent' : bgColor"
            :style="design === 'modern' ? 'padding: 0 12px;' : ''"
            :rules="validationRules"
            :error="hasError"
            :error-message="errorMessage"
          >
            <template v-slot:append>
              <q-icon
                name="event"
                class="cursor-pointer"
                :color="deshabilitar ? 'grey' : 'cyan'"
              >
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                  ref="fechaProxy"
                >
                  <q-date
                    v-model="fechaModelo"
                    :mask="'DD/MM/YYYY'"
                    :min="minDateFormatted"
                    :max="maxDateFormatted"
                  >
                    <div class="row items-center justify-end q-gutter-sm q-pa-md">
                      <q-btn v-close-popup label="Cancelar" color="grey" flat />
                      <q-btn label="Aceptar" color="cyan" @click="confirmarFecha" v-close-popup />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <label
            v-if="etiqueta && design === 'modern'"
            class="modern-float-label"
            :class="{
              'modern-float-label--active': fechaModelo,
              'modern-float-label--required': required
            }"
          >
            {{ etiqueta }}
          </label>
        </div>
        <div v-if="hint" class="text-xs text-[#8aa8b8] mt-1 ml-1">{{ hint }}</div>
      </div>
    </template>

    <!-- ==================== TIPO: FECHA-HORA ==================== -->
    <template v-else-if="tipo === 'fecha-hora'">
      <div class="relative w-full">
        <label v-if="etiqueta && design !== 'modern'" class="text-xs font-medium text-[#c0e0e8]" :class="{ 'required-field': required }">
          {{ etiqueta }}
        </label>
        <div class="relative" :class="{ 'modern-input-container': design === 'modern' }">
          <q-input
            :outlined="design !== 'modern'"
            :borderless="design === 'modern'"
            dense
            dark
            :model-value="fechaHoraDisplay"
            :readonly="deshabilitar"
            :placeholder="!etiqueta ? 'Seleccionar fecha y hora' : ''"
            :class="design === 'modern' ? 'modern-q-input' : inputClasses"
            :bg-color="design === 'modern' ? 'transparent' : bgColor"
            :style="design === 'modern' ? 'padding: 0 12px;' : ''"
            :rules="validationRules"
          >
            <template v-slot:append>
              <q-icon
                name="access_time"
                class="cursor-pointer"
                :color="deshabilitar ? 'grey' : 'cyan'"
              >
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                  ref="fechaHoraProxy"
                >
                  <div class="bg-dark q-pa-md" style="min-width: 300px;">
                    <q-date
                      v-model="fechaHoraModelo"
                      :mask="'DD/MM/YYYY'"
                      :min="minDateFormatted"
                      :max="maxDateFormatted"
                    />
                    <q-time
                      v-model="horaModelo"
                      :format24h="true"
                      class="q-mt-md"
                    />
                    <div class="row items-center justify-end q-gutter-sm q-mt-md">
                      <q-btn v-close-popup label="Cancelar" color="grey" flat />
                      <q-btn label="Aceptar" color="cyan" @click="confirmarFechaHora" v-close-popup />
                    </div>
                  </div>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <label
            v-if="etiqueta && design === 'modern'"
            class="modern-float-label"
            :class="{
              'modern-float-label--active': fechaHoraModelo && horaModelo,
              'modern-float-label--required': required
            }"
          >
            {{ etiqueta }}
          </label>
        </div>
        <div v-if="hint" class="text-xs text-[#8aa8b8] mt-1 ml-1">{{ hint }}</div>
      </div>
    </template>

    <!-- ==================== TIPO: FECHA-RANGO ==================== -->
    <template v-else-if="tipo === 'fecha-rango'">
      <div class="relative w-full">
        <label v-if="etiqueta && design !== 'modern'" class="text-xs font-medium text-[#c0e0e8]" :class="{ 'required-field': required }">
          {{ etiqueta }}
        </label>
        <div class="relative" :class="{ 'modern-input-container': design === 'modern' }">
          <q-input
            :outlined="design !== 'modern'"
            :borderless="design === 'modern'"
            dense
            dark
            :model-value="rangoDisplay"
            :readonly="deshabilitar"
            :placeholder="!etiqueta ? 'Seleccionar rango de fechas' : ''"
            :class="design === 'modern' ? 'modern-q-input' : inputClasses"
            :bg-color="design === 'modern' ? 'transparent' : bgColor"
            :style="design === 'modern' ? 'padding: 0 12px;' : ''"
            :rules="validationRules"
          >
            <template v-slot:append>
              <q-icon
                name="date_range"
                class="cursor-pointer"
                :color="deshabilitar ? 'grey' : 'cyan'"
              >
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                  ref="rangoProxy"
                >
                  <q-date
                    v-model="rangoModelo"
                    range
                    :mask="'DD/MM/YYYY'"
                    :min="minDateFormatted"
                    :max="maxDateFormatted"
                  >
                    <div class="row items-center justify-end q-gutter-sm q-pa-md">
                      <q-btn v-close-popup label="Cancelar" color="grey" flat />
                      <q-btn label="Aceptar" color="cyan" @click="confirmarRango" v-close-popup />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <label
            v-if="etiqueta && design === 'modern'"
            class="modern-float-label"
            :class="{
              'modern-float-label--active': rangoModelo?.from,
              'modern-float-label--required': required
            }"
          >
            {{ etiqueta }}
          </label>
        </div>
        <div v-if="hint" class="text-xs text-[#8aa8b8] mt-1 ml-1">{{ hint }}</div>
      </div>
    </template>

    <!-- ==================== TIPO: PASS ==================== -->
    <template v-else-if="tipo === 'pass'">
      <div class="relative w-full">
        <label v-if="etiqueta && design !== 'modern'" class="text-xs font-medium text-[#c0e0e8]" :class="{ 'required-field': required }">
          {{ etiqueta }}
        </label>
        <div class="relative" :class="{ 'modern-input-container': design === 'modern' }">
          <q-input
            :outlined="design !== 'modern'"
            :borderless="design === 'modern'"
            dense
            dark
            :type="showPassword ? 'text' : 'password'"
            v-model="textComputed"
            :rules="validationRules"
            :readonly="deshabilitar"
            :clearable="!deshabilitar"
            :hint="hint"
            color="cyan"
            :bg-color="design === 'modern' ? 'transparent' : bgColor"
            :class="design === 'modern' ? 'modern-q-input' : inputClasses"
            :style="design === 'modern' ? 'padding: 0 12px;' : ''"
            no-error-icon
          >
            <template v-slot:append>
              <q-icon
                v-if="textComputed && textComputed.length > 0 && !deshabilitar"
                name="close"
                @click="clearPassword"
                class="cursor-pointer text-[#8aa8b8] hover:text-red-400"
                size="20px"
              />
              <q-icon
                :name="showPassword ? 'visibility_off' : 'visibility'"
                @click="togglePasswordVisibility"
                class="cursor-pointer text-[#8aa8b8] hover:text-cyan-400"
                size="20px"
              />
            </template>
          </q-input>
          <label
            v-if="etiqueta && design === 'modern'"
            class="modern-float-label"
            :class="{
              'modern-float-label--active': textComputed,
              'modern-float-label--required': required
            }"
          >
            {{ etiqueta }}
          </label>
        </div>
      </div>
    </template>

    <!-- ==================== TIPO: TEXTAREA ==================== -->
    <template v-else-if="tipo === 'textarea'">
      <div class="relative w-full">
        <label v-if="etiqueta && design !== 'modern'" class="text-xs font-medium text-[#c0e0e8]" :class="{ 'required-field': required }">
          {{ etiqueta }}
        </label>
        <div class="relative" :class="{ 'modern-input-container': design === 'modern' }">
          <q-input
            :outlined="design !== 'modern'"
            :borderless="design === 'modern'"
            dense
            dark
            type="textarea"
            v-model="textComputed"
            :rules="validationRules"
            :readonly="deshabilitar"
            :rows="rows"
            :autogrow="autogrow"
            :hint="hint"
            color="cyan"
            :bg-color="design === 'modern' ? 'transparent' : bgColor"
            :class="design === 'modern' ? 'modern-q-input' : inputClasses"
            :style="design === 'modern' ? 'padding: 0 12px;' : ''"
            no-error-icon
          />
          <label
            v-if="etiqueta && design === 'modern'"
            class="modern-float-label"
            :class="{
              'modern-float-label--active': textComputed,
              'modern-float-label--required': required
            }"
          >
            {{ etiqueta }}
          </label>
        </div>
      </div>
    </template>

    <!-- ==================== TIPOS POR DEFECTO (text, email, nombres, celular, telefono) ==================== -->
    <template v-else>
      <div class="relative w-full">
        <label v-if="etiqueta && design !== 'modern'" class="text-xs font-medium text-[#c0e0e8]" :class="{ 'required-field': required }">
          {{ etiqueta }}
        </label>
        <div class="relative" :class="{ 'modern-input-container': design === 'modern' }">
          <q-input
            :outlined="design !== 'modern'"
            :borderless="design === 'modern'"
            dense
            dark
            :type="inputType"
            v-model="textComputed"
            :rules="validationRules"
            :mask="computedMask"
            :readonly="deshabilitar"
            :clearable="!deshabilitar && tipo !== 'pass'"
            :hint="hint"
            :rows="rows"
            :autogrow="autogrow"
            color="cyan"
            :bg-color="design === 'modern' ? 'transparent' : bgColor"
            :class="design === 'modern' ? 'modern-q-input' : inputClasses"
            :style="design === 'modern' ? 'padding: 0 12px;' : ''"
            no-error-icon
            :fill-mask="true"
          />
          <label
            v-if="etiqueta && design === 'modern'"
            class="modern-float-label"
            :class="{
              'modern-float-label--active': textComputed,
              'modern-float-label--required': required
            }"
          >
            {{ etiqueta }}
          </label>
        </div>
        <div v-if="hint" class="text-xs text-[#8aa8b8] mt-1 ml-1">{{ hint }}</div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, toRefs, ref, watch } from "vue";

const props = defineProps({
  valor: {
    type: [String, Number, Array, Object],
    default: "",
  },
  validacion: {
    type: Array,
    default: () => [],
  },
  tipo: {
    type: String,
    default: "text",
  },
  etiqueta: {
    type: String,
    default: "",
  },
  mascara: {
    type: String,
    default: "",
  },
  deshabilitar: {
    type: Boolean,
    default: false,
  },
  hint: {
    type: String,
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
  rows: {
    type: [String, Number],
    default: "1",
  },
  autogrow: {
    type: Boolean,
    default: false,
  },
  bgColor: {
    type: String,
    default: "rgba(11, 31, 51, 0.8)",
  },
  design: {
    type: String,
    default: "neon",
  },
  minDate: {
    type: String,
    default: "",
  },
  maxDate: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:valor"]);

const {
  etiqueta,
  valor,
  validacion,
  tipo,
  mascara,
  deshabilitar,
  hint,
  required,
  rows,
  autogrow,
  bgColor,
  design,
  minDate,
  maxDate,
} = toRefs(props);

const showPassword = ref(false);
const hasError = ref(false);
const errorMessage = ref("");

const inputClasses =
  'z-[999] [&_.q-field__control]:rounded-lg [&_.q-field__native]:text-white [&_.q-field__label]:text-[#8aa8b8]';

// Formatear fechas min/max para el selector
const minDateFormatted = computed(() => {
  if (!minDate.value) return "";
  return minDate.value;
});

const maxDateFormatted = computed(() => {
  if (!maxDate.value) return "";
  return maxDate.value;
});

// --- Lógica de Fechas ---
const fechaModelo = ref("");
const fechaProxy = ref(null);

const fechaDisplay = computed(() => {
  if (!fechaModelo.value) return "";
  return fechaModelo.value;
});

const confirmarFecha = () => {
  if (fechaModelo.value) {
    const [dia, mes, ano] = fechaModelo.value.split("/");
    const fechaISO = `${ano}-${mes}-${dia}`;
    emit("update:valor", fechaISO);
  } else {
    emit("update:valor", "");
  }
};

// --- Lógica Fecha-Hora ---
const fechaHoraModelo = ref("");
const horaModelo = ref("");
const fechaHoraProxy = ref(null);

const fechaHoraDisplay = computed(() => {
  if (!fechaHoraModelo.value) return "";
  if (!horaModelo.value) return fechaHoraModelo.value;
  return `${fechaHoraModelo.value} ${horaModelo.value}`;
});

const confirmarFechaHora = () => {
  if (fechaHoraModelo.value && horaModelo.value) {
    const [dia, mes, ano] = fechaHoraModelo.value.split("/");
    const fechaISO = `${ano}-${mes}-${dia}`;
    emit("update:valor", `${fechaISO} ${horaModelo.value}`);
  } else if (fechaHoraModelo.value && !horaModelo.value) {
    const [dia, mes, ano] = fechaHoraModelo.value.split("/");
    const fechaISO = `${ano}-${mes}-${dia}`;
    emit("update:valor", `${fechaISO} 00:00`);
  } else {
    emit("update:valor", "");
  }
};

// --- Lógica Rango ---
const rangoModelo = ref({ from: "", to: "" });

const rangoDisplay = computed(() => {
  if (rangoModelo.value.from && rangoModelo.value.to) {
    return `${rangoModelo.value.from} - ${rangoModelo.value.to}`;
  } else if (rangoModelo.value.from) {
    return `Desde: ${rangoModelo.value.from}`;
  }
  return "";
});

const confirmarRango = () => {
  if (rangoModelo.value.from && rangoModelo.value.to) {
    emit("update:valor", {
      from: rangoModelo.value.from,
      to: rangoModelo.value.to,
    });
  } else if (rangoModelo.value.from) {
    emit("update:valor", {
      from: rangoModelo.value.from,
      to: "",
    });
  } else {
    emit("update:valor", null);
  }
};

// --- Inicialización de valores desde props ---
watch(
  () => valor.value,
  (nuevo) => {
    if (tipo.value === "fecha" && nuevo) {
      if (typeof nuevo === "string" && nuevo.includes("-")) {
        const [ano, mes, dia] = nuevo.split("-");
        fechaModelo.value = `${dia}/${mes}/${ano}`;
      } else if (typeof nuevo === "string" && nuevo.includes("/")) {
        fechaModelo.value = nuevo;
      } else {
        fechaModelo.value = "";
      }
    } else if (tipo.value === "fecha-hora" && nuevo) {
      if (typeof nuevo === "string" && nuevo.includes(" ")) {
        const [fechaISO, hora] = nuevo.split(" ");
        const [ano, mes, dia] = fechaISO.split("-");
        fechaHoraModelo.value = `${dia}/${mes}/${ano}`;
        horaModelo.value = hora;
      } else if (typeof nuevo === "string" && !nuevo.includes(" ")) {
        const [ano, mes, dia] = nuevo.split("-");
        fechaHoraModelo.value = `${dia}/${mes}/${ano}`;
        horaModelo.value = "00:00";
      }
    } else if (tipo.value === "fecha-rango" && nuevo && typeof nuevo === "object") {
      rangoModelo.value = nuevo;
    }
  },
  { immediate: true, deep: true }
);

// --- Validaciones ---
const getValidationRules = () => {
  const rules = [];

  if (
    required.value ||
    (validacion?.value?.length > 0 &&
      validacion.value.some((r) => r.toString().includes("requerido")))
  ) {
    rules.push((val) => {
      if (tipo.value === "fecha-rango") {
        return (val && val.from) || `${etiqueta.value} es requerido`;
      }
      return !!val || `${etiqueta.value} es requerido`;
    });
  }

  if (validacion?.value?.length) {
    rules.push(...validacion.value.filter((r) => !r.toString().includes("requerido")));
  }

  if (tipo?.value === "celular") {
    rules.push((val) => {
      if (!val && !required.value) return true;
      if (!val) return "El número de celular es requerido";
      const celularRegex = /^\+591[0-9]{8}$/;
      return celularRegex.test(val) || "Debe tener formato +591 seguido de 8 dígitos";
    });
  } else if (tipo?.value === "telefono") {
    rules.push((val) => {
      if (!val && !required.value) return true;
      if (!val) return "El número de teléfono es requerido";
      const telefonoRegex = /^\d{2}-\d{6}$/;
      return telefonoRegex.test(val) || "Debe tener formato ## - ###### (ejemplo: 71-234567)";
    });
  } else if (tipo?.value === "nombres") {
    rules.push((val) => {
      if (!val && !required.value) return true;
      if (!val) return "El nombre es requerido";
      const nombresRegex = /^[A-Za-záéíóúñÁÉÍÓÚÑ]+(?:\s[A-Za-záéíóúñÁÉÍÓÚÑ]+)*$/;
      return nombresRegex.test(val) || "Solo letras y espacios, sin espacios al inicio o final";
    });
  } else if (tipo?.value === "email") {
    rules.push((val) => {
      if (!val) return true;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(val) || "Ingrese un correo electrónico válido";
    });
  } else if (tipo?.value === "pass") {
    rules.push((val) => {
      if (!val && !required.value) return true;
      if (!val && required.value) return "La contraseña es requerida";
      if (val && val.length < 6) return "La contraseña debe tener al menos 6 caracteres";
      if (val && /\s/.test(val)) return "La contraseña no debe contener espacios";
      if (val && !/\d/.test(val)) return "La contraseña debe contener al menos un número";
      if (val && !/[A-Z]/.test(val))
        return "La contraseña debe contener al menos una letra mayúscula";
      if (val && !/[a-z]/.test(val))
        return "La contraseña debe contener al menos una letra minúscula";
      return true;
    });
  }

  return rules;
};

const validationRules = computed(() => getValidationRules());

const inputType = computed(() => {
  if (tipo?.value === "email") return "email";
  if (tipo?.value === "celular" || tipo?.value === "telefono") return "tel";
  return "text";
});

const computedMask = computed(() => {
  if (tipo?.value === "celular") return "+591 #### ####";
  if (tipo?.value === "telefono") return "## - ######";
  return mascara?.value;
});

const toUpperCaseNames = (value) => {
  if (tipo?.value === "nombres" && value) {
    return value.toUpperCase();
  }
  return value;
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const clearPassword = () => {
  emit("update:valor", "");
};

const textComputed = computed({
  get: () => {
    let value = valor.value;
    if (tipo?.value === "celular" && value && !value.startsWith("+591")) {
      const numbers = value.replace(/\D/g, "");
      if (numbers.length <= 8) {
        value = "+591" + numbers;
      }
    }
    return toUpperCaseNames(value) || "";
  },
  set: (val) => {
    let processedValue = val || "";

    if (tipo?.value === "celular") {
      const numbers = val?.replace(/\D/g, "") || "";
      if (numbers.length >= 4) {
        const cleanNumbers = numbers.slice(3, 11);
        processedValue = cleanNumbers ? "+591" + cleanNumbers : "";
      } else if (numbers.length > 0) {
        processedValue = "+591" + numbers;
      } else {
        processedValue = "";
      }

      if (processedValue && processedValue.replace(/\D/g, "").length > 11) {
        const numbersOnly = processedValue.replace(/\D/g, "");
        processedValue = "+591" + numbersOnly.slice(3, 11);
      }
    } else if (tipo?.value === "telefono") {
      let numbers = val?.replace(/\D/g, "") || "";
      numbers = numbers.slice(0, 8);

      if (numbers.length >= 2) {
        const firstTwo = numbers.slice(0, 2);
        const remaining = numbers.slice(2, 8);
        processedValue = remaining ? `${firstTwo}-${remaining}` : firstTwo;
      } else {
        processedValue = numbers;
      }
    } else if (tipo?.value === "nombres") {
      processedValue = val?.replace(/^\s+/, "").replace(/\s+/g, " ") || "";
      processedValue = processedValue.replace(/\s$/, "");
      processedValue = processedValue.toUpperCase();
    } else if (tipo?.value === "email") {
      processedValue = val?.toLowerCase() || "";
    } else {
      processedValue = val || "";
    }

    emit("update:valor", processedValue);
  },
});
</script>

<style scoped>
/* Neon design styles */
.required-field::after {
  content: "*";
  color: #ff6b6b;
  margin-left: 4px;
}

/* Modern design styles */
.modern-container {
  width: 100%;
  padding:0.5rem 0 0.5rem 0;
}

.modern-input-container {
  position: relative;
  border: 1px solid rgba(192, 224, 232, 0.3);
  border-radius: 12px;
  background-color: rgba(11, 31, 51, 0.4);
  transition: all 0.2s ease;
  height: 50px;
}

.modern-input-container:focus-within {
  border-color: #00bcd4;
  box-shadow: 0 0 0 1px rgba(0, 188, 212, 0.2);
}

.modern-q-input {
  width: 100%;
  height: 100%;
}

.modern-q-input :deep(.q-field) {
  height: 100%;
}

.modern-q-input :deep(.q-field__control) {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  min-height: 50px !important;
  height: 50px !important;
  padding: 0 12px !important;
}

.modern-q-input :deep(.q-field__native) {
  color: white !important;
  font-size: 0.9rem;
  padding: 0 !important;
  line-height: 50px !important;
}

.modern-q-input :deep(.q-field__marginal) {
  background: transparent !important;
  color: #8aa8b8 !important;
  height: 50px !important;
  min-height: 50px !important;
}

.modern-q-input :deep(.q-field--textarea) {
  height: auto !important;
}

.modern-q-input :deep(.q-field--textarea .q-field__control) {
  min-height: 80px !important;
  height: auto !important;
}

.modern-q-input :deep(.q-field--textarea .q-field__native) {
  line-height: 1.4 !important;
  padding: 12px 0 !important;
}

/* Etiqueta flotante */
.modern-float-label {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  padding: 0 4px;
  font-size: 0.85rem;
  color: #8aa8b8;
  transition: all 0.2s ease;
  pointer-events: none;
  z-index: 1;
  font-weight: 400;
}

.modern-float-label--active {
  top: 0;
  transform: translateY(-50%);
  font-size: 0.65rem;
  color: #00bcd4;
  background-color: rgba(11, 31, 51, 0.9);
  padding: 0 4px;
  border-radius: 4px;
}

.modern-float-label--required::after {
  content: "*";
  color: #ff6b6b;
  margin-left: 2px;
}

.modern-input-container:focus-within .modern-float-label:not(.modern-float-label--active) {
  color: #00bcd4;
}
</style>
