<template>
  <div class="flex flex-col gap-1">
    <label
      class="text-xs font-medium text-[#c0e0e8]"
      :class="{ 'required-field': required }"
    >
      {{ etiqueta }}
    </label>
    <div class="relative">
      <q-input
        outlined
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
        :bg-color="bgColor"
        :class="inputClasses"
        no-error-icon
        :fill-mask="true"
      >
        <!-- Slot para acciones del lado derecho (solo para tipo pass) -->
        <template
          v-if="tipo === 'pass' && !deshabilitar"
          v-slot:append
        >
          <!-- Botón para limpiar (opcional) -->
          <q-icon
            v-if="textComputed && textComputed.length > 0"
            name="close"
            @click="clearPassword"
            class="cursor-pointer text-[#8aa8b8] hover:text-red-400"
            size="20px"
          />
          <!-- Botón para mostrar/ocultar contraseña -->
          <q-icon
            :name="showPassword ? 'visibility_off' : 'visibility'"
            @click="togglePasswordVisibility"
            class="cursor-pointer text-[#8aa8b8] hover:text-cyan-400"
            size="20px"
          />
        </template>
      </q-input>
    </div>
  </div>
</template>

<script setup>
import { computed, toRefs, ref } from 'vue'

const props = defineProps({
  valor: {
    type: [String, Number, Array],
    default: '',
  },
  validacion: {
    type: Array,
    default: () => [],
  },
  tipo: {
    type: String,
    default: 'text',
  },
  etiqueta: {
    type: String,
    default: '',
  },
  mascara: {
    type: String,
    default: '',
  },
  deshabilitar: {
    type: Boolean,
    default: false,
  },
  hint: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  rows: {
    type: [String, Number],
    default: '1',
  },
  autogrow: {
    type: Boolean,
    default: false,
  },
  bgColor: {
    type: String,
    default: 'rgba(11, 31, 51, 0.8)',
  },
})

const emit = defineEmits(['update:valor'])

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
} = toRefs(props)

// Estado para mostrar/ocultar contraseña
const showPassword = ref(false)

// Clases CSS unificadas
const inputClasses =
  'z-[999] [&_.q-field__control]:rounded-lg [&_.q-field__native]:text-white [&_.q-field__label]:text-[#8aa8b8]'

// Validaciones específicas por tipo
const getValidationRules = () => {
  const rules = []

  // Regla de requerido
  if (
    required.value ||
    (validacion?.value?.length > 0 &&
      validacion.value.some((r) => r.toString().includes('requerido')))
  ) {
    rules.push(
      (val) =>
        !!val ||
        `${etiqueta.value} es requerido${etiqueta.value === 'Descripción de la idea' ? 'a' : ''}`,
    )
  }

  // Agregar validaciones personalizadas
  if (validacion?.value?.length) {
    rules.push(...validacion.value.filter((r) => !r.toString().includes('requerido')))
  }

  // Validaciones según el tipo
  if (tipo?.value === 'celular') {
    rules.push((val) => {
      if (!val && !required.value) return true
      if (!val) return 'El número de celular es requerido'
      const celularRegex = /^\+591[0-9]{8}$/
      return celularRegex.test(val) || 'Debe tener formato +591 seguido de 8 dígitos'
    })
  } else if (tipo?.value === 'telefono') {
    rules.push((val) => {
      if (!val && !required.value) return true
      if (!val) return 'El número de teléfono es requerido'
      const telefonoRegex = /^\d{2}-\d{6}$/
      return telefonoRegex.test(val) || 'Debe tener formato ## - ###### (ejemplo: 71-234567)'
    })
  } else if (tipo?.value === 'nombres') {
    rules.push((val) => {
      if (!val && !required.value) return true
      if (!val) return 'El nombre es requerido'
      const nombresRegex = /^[A-Za-záéíóúñÁÉÍÓÚÑ]+(?:\s[A-Za-záéíóúñÁÉÍÓÚÑ]+)*$/
      return nombresRegex.test(val) || 'Solo letras y espacios, sin espacios al inicio o final'
    })
  } else if (tipo?.value === 'email') {
    rules.push((val) => {
      if (!val) return true
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(val) || 'Ingrese un correo electrónico válido'
    })
  } else if (tipo?.value === 'pass') {
    // Validación de contraseña segura
    rules.push((val) => {
      if (!val && !required.value) return true
      if (!val && required.value) return 'La contraseña es requerida'

      // Validar mínimo 6 caracteres
      if (val && val.length < 6) return 'La contraseña debe tener al menos 6 caracteres'

      // Validar que no tenga espacios
      if (val && /\s/.test(val)) return 'La contraseña no debe contener espacios'

      // Validar al menos un número
      if (val && !/\d/.test(val)) return 'La contraseña debe contener al menos un número'

      // Validar al menos una letra mayúscula
      if (val && !/[A-Z]/.test(val))
        return 'La contraseña debe contener al menos una letra mayúscula'

      // Validar al menos una letra minúscula
      if (val && !/[a-z]/.test(val))
        return 'La contraseña debe contener al menos una letra minúscula'

      return true
    })
  }

  return rules
}

const validationRules = computed(() => getValidationRules())

// Tipo de input según corresponda
const inputType = computed(() => {
  if (tipo?.value === 'textarea') return 'textarea'
  if (tipo?.value === 'celular' || tipo?.value === 'telefono') return 'tel'
  if (tipo?.value === 'email') return 'email'
  if (tipo?.value === 'pass') {
    return showPassword.value ? 'text' : 'password'
  }
  return 'text'
})

// Máscara según el tipo
const computedMask = computed(() => {
  if (tipo?.value === 'celular') return '+591 #### ####'
  if (tipo?.value === 'telefono') return '## - ######'
  return mascara?.value
})

// Convertir a mayúsculas para tipo nombres
const toUpperCaseNames = (value) => {
  if (tipo?.value === 'nombres' && value) {
    return value.toUpperCase()
  }
  return value
}

// Función para alternar visibilidad de contraseña
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

// Función para limpiar el campo de contraseña
const clearPassword = () => {
  emit('update:valor', '')
}

const textComputed = computed({
  get: () => {
    let value = valor.value

    // Formatear celular para mostrar con prefijo
    if (tipo?.value === 'celular' && value && !value.startsWith('+591')) {
      const numbers = value.replace(/\D/g, '')
      if (numbers.length <= 8) {
        value = '+591' + numbers
      }
    }

    return toUpperCaseNames(value) || ''
  },
  set: (val) => {
    let processedValue = val || ''

    // Procesar según el tipo
    if (tipo?.value === 'celular') {
      const numbers = val?.replace(/\D/g, '') || ''
      if (numbers.length >= 4) {
        const cleanNumbers = numbers.slice(3, 11)
        processedValue = cleanNumbers ? '+591' + cleanNumbers : ''
      } else if (numbers.length > 0) {
        processedValue = '+591' + numbers
      } else {
        processedValue = ''
      }

      if (processedValue && processedValue.replace(/\D/g, '').length > 11) {
        const numbersOnly = processedValue.replace(/\D/g, '')
        processedValue = '+591' + numbersOnly.slice(3, 11)
      }
    } else if (tipo?.value === 'telefono') {
      let numbers = val?.replace(/\D/g, '') || ''
      numbers = numbers.slice(0, 8)

      if (numbers.length >= 2) {
        const firstTwo = numbers.slice(0, 2)
        const remaining = numbers.slice(2, 8)
        processedValue = remaining ? `${firstTwo}-${remaining}` : firstTwo
      } else {
        processedValue = numbers
      }
    } else if (tipo?.value === 'nombres') {
      processedValue = val?.replace(/^\s+/, '').replace(/\s+/g, ' ') || ''
      processedValue = processedValue.replace(/\s$/, '')
      processedValue = processedValue.toUpperCase()
    } else if (tipo?.value === 'email') {
      processedValue = val?.toLowerCase() || ''
    } else {
      processedValue = val || ''
    }

    emit('update:valor', processedValue)
  },
})
</script>

<style scoped>
.required-field::after {
  content: '*';
  color: #ff6b6b;
  margin-left: 4px;
}
</style>
