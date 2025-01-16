<template>
  <v-form>
    <!-- <v-text-field v-model="item.id" label="ID" type="number" required :readonly="mode === 'view'"
      :rules="numberRules" /> -->
    
      <v-text-field 
      v-model="item.name" 
      label="Nombre" 
      required 
      :readonly="mode === 'view'" />

    <v-autocomplete 
      v-model="item.provinceId" 
      :items="getFormattedItems(provinceData)"
      item-title="label" 
      item-value="value"
      label="Provincia" 
      required
      :readonly="mode === 'view'" 
      no-data-text="No hay más datos disponibles" />

    <v-autocomplete 
      v-model="item.serviceTypeId" 
      :items="getFormattedItems(serviceTypeData)"
      item-title="label" 
      item-value="value"
      label="Tipo servicio" 
      required
      :readonly="mode === 'view'" 
      no-data-text="No hay más datos disponibles" />

    <v-autocomplete 
      v-model="item.providerTypeId" 
      :items="getFormattedItems(providerTypeData)"
      item-title="label" 
      item-value="value" 
      label="Tipo" 
      required
      :readonly="mode === 'view'" 
      no-data-text="No hay más datos disponibles" />
      
    <v-text-field 
      v-model="item.address" 
      label="Dirección" 
      required 
      :readonly="mode === 'view'" />
    
    <v-text-field 
      v-model="item.phone" 
      label="Teléfono" 
      required 
      :readonly="mode === 'view'" 
      :rules="phoneRules" />
    
    <v-text-field 
      v-model="item.email" 
      label="Email" 
      type="email" 
      required 
      :readonly="mode === 'view'"
      :rules="emailRules" />

    <v-text-field 
      v-model="item.responsibleName" 
      label="Nombre del responsable" 
      required 
      :readonly="mode === 'view'" />

    <v-text-field 
      v-if="item.providerTypeId == 1"
      v-model="item.fax" 
      label="Teléfono" 
      required 
      :readonly="mode === 'view'" 
      :rules="phoneRules" />

    <v-text-field 
      v-if="item.providerTypeId == 1"
      v-model="item.cityDistance" 
      label="Distancia de la ciudad" 
      type="number" 
      required 
      :readonly="mode === 'view'"
      :rules="numberRules" />

    <v-autocomplete 
      v-if="item.providerTypeId == 1"
      v-model="item.clinicId" 
      :items="getFormattedItems(clinicData)"
      item-title="label" 
      item-value="value" 
      label="Clínica" 
      required
      :readonly="mode === 'view'" 
      no-data-text="No hay más datos disponibles" />

    <v-autocomplete 
      v-if="item.providerTypeId == 1"
      v-model="item.specialityId" 
      :items="getFormattedItems(specialityData)"
      item-title="label" 
      item-value="value"
      label="Especialidad" 
      required
      :readonly="mode === 'view'" 
      no-data-text="No hay más datos disponibles" />

      
  </v-form>
</template>

<script setup>
import { ref, computed, defineProps, onMounted } from 'vue';
import provinceService from '../../Nomenclators/provincia/provinciaService'
import serviceTypeService from '../../Nomenclators/tiposervicio/tiposervicioService'
import providerTypeService from '../../Nomenclators/tipoproveedor/tipoproveedorService'
import clinicService from '../../Nomenclators/clinica/clinicaService'
import specialityService from '../../Nomenclators/especialidad/especialidadService'

let props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
  mode: {
    type: String,
    required: true,
  },
});

const provinceData = ref([])
const serviceTypeData = ref([])
const providerTypeData = ref([])
const clinicData = ref([])
const specialityData = ref([])

let numberRules = [
  value => {
    if (value <= 0 || value === 0) {
      return 'Debe ser el número mayor que 0.';
    }
    return true;
  }
];

let phoneRules = [
  value => {
    if (value?.length == 8) {
      return true;
    }
    return 'Un teléfono tiene 8 dígitos';
  }
];

let emailRules = [
  value => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(value)) {
      return true;
    }
    return 'Por favor, ingrese un correo electrónico válido';
  }
];

const getProvinceService = async () => {
  try {
    let allProvince = []; // Array para acumular todas las razas
    let currentPage = 0; // Comenzamos con la página 0 (o 1, según el backend)
    let totalPages = 1; // Inicializamos totalPages a 1 (para la primera llamada)

    do { // Usamos un bucle do-while para al menos obtener la primera página

      const { provinces, pagination } = await provinceService.getProvinces(currentPage);
        
        if(provinces){
          allProvince.push(...provinces); // Agregamos las razas de la página actual a la lista
        }

        totalPages = pagination.totalPages; // Actualizamos el número total de páginas
        currentPage++; // Incrementamos para obtener la siguiente página
    } while (currentPage < totalPages); // Continuamos hasta procesar todas las páginas

    provinceData.value = allProvince; // Actualizamos providerData con todas las razas
    console.log(provinceData.value);

        // Establece el valor predeterminado si estamos en modo 'add'
        if (props.mode === 'add' && provinceData.value.length > 0) {
      props.item.provinceId = provinceData.value[0].id; // Selecciona el primer elemento
    }

  } catch (error) {
    console.error('Error al cargar las razas:', error);
  }
};

const getServiceTypeService = async () => {
  try {
    let allServiceType = []; // Array para acumular todas las razas
    let currentPage = 0; // Comenzamos con la página 0 (o 1, según el backend)
    let totalPages = 1; // Inicializamos totalPages a 1 (para la primera llamada)

    do { // Usamos un bucle do-while para al menos obtener la primera página

      const { servicetype, pagination } = await serviceTypeService.getServicetype(currentPage);
        
        if(servicetype){
          allServiceType.push(...servicetype); // Agregamos las razas de la página actual a la lista
        }

        totalPages = pagination.totalPages; // Actualizamos el número total de páginas
        currentPage++; // Incrementamos para obtener la siguiente página
    } while (currentPage < totalPages); // Continuamos hasta procesar todas las páginas

    serviceTypeData.value = allServiceType; // Actualizamos providerData con todas las razas
    console.log(serviceTypeData.value);

        // Establece el valor predeterminado si estamos en modo 'add'
        if (props.mode === 'add' && serviceTypeData.value.length > 0) {
      props.item.serviceTypeId = serviceTypeData.value[0].id; // Selecciona el primer elemento
    }

  } catch (error) {
    console.error('Error al cargar las razas:', error);
  }
};

const getProviderTypeService = async () => {
  try {
    let allProviderType = []; // Array para acumular todas las razas
    let currentPage = 0; // Comenzamos con la página 0 (o 1, según el backend)
    let totalPages = 1; // Inicializamos totalPages a 1 (para la primera llamada)

    do { // Usamos un bucle do-while para al menos obtener la primera página

      const { providertype, pagination } = await providerTypeService.getProvidertype(currentPage);
        
        if(providertype){
          allProviderType.push(...providertype); // Agregamos las razas de la página actual a la lista
        }

        totalPages = pagination.totalPages; // Actualizamos el número total de páginas
        currentPage++; // Incrementamos para obtener la siguiente página
    } while (currentPage < totalPages); // Continuamos hasta procesar todas las páginas

    providerTypeData.value = allProviderType; // Actualizamos providerData con todas las razas
    console.log(providerTypeData.value);

        // Establece el valor predeterminado si estamos en modo 'add'
        if (props.mode === 'add' && providerTypeData.value.length > 0) {
      props.item.providerTypeId = providerTypeData.value[0].id; // Selecciona el primer elemento
    }

  } catch (error) {
    console.error('Error al cargar las razas:', error);
  }
};

const getClinicService = async () => {
  try {
    let allClinic = []; // Array para acumular todas las razas
    let currentPage = 0; // Comenzamos con la página 0 (o 1, según el backend)
    let totalPages = 1; // Inicializamos totalPages a 1 (para la primera llamada)

    do { // Usamos un bucle do-while para al menos obtener la primera página

      const { clinic, pagination } = await clinicService.getClinic(currentPage);
        
        if(clinic){
          allClinic.push(...clinic); // Agregamos las razas de la página actual a la lista
        }

        totalPages = pagination.totalPages; // Actualizamos el número total de páginas
        currentPage++; // Incrementamos para obtener la siguiente página
    } while (currentPage < totalPages); // Continuamos hasta procesar todas las páginas

    clinicData.value = allClinic; // Actualizamos providerData con todas las razas
    console.log(clinicData.value);

        // Establece el valor predeterminado si estamos en modo 'add'
        if (props.mode === 'add' && clinicData.value.length > 0) {
      props.item.clinicId = clinicData.value[0].id; // Selecciona el primer elemento
    }

  } catch (error) {
    console.error('Error al cargar las razas:', error);
  }
};

const getSpecialityService = async () => {
  try {
    let allSpeciality = []; // Array para acumular todas las razas
    let currentPage = 0; // Comenzamos con la página 0 (o 1, según el backend)
    let totalPages = 1; // Inicializamos totalPages a 1 (para la primera llamada)

    do { // Usamos un bucle do-while para al menos obtener la primera página

      const { speciality, pagination } = await specialityService.getSpeciality(currentPage);
        
        if(speciality){
          allSpeciality.push(...speciality); // Agregamos las razas de la página actual a la lista
        }

        totalPages = pagination.totalPages; // Actualizamos el número total de páginas
        currentPage++; // Incrementamos para obtener la siguiente página
    } while (currentPage < totalPages); // Continuamos hasta procesar todas las páginas

    specialityData.value = allSpeciality; // Actualizamos providerData con todas las razas
    console.log(specialityData.value);

        // Establece el valor predeterminado si estamos en modo 'add'
        if (props.mode === 'add' && specialityData.value.length > 0) {
      props.item.specialityId = specialityData.value[0].id; // Selecciona el primer elemento
    }

  } catch (error) {
    console.error('Error al cargar las razas:', error);
  }
};

// Método para formatear los items
const getFormattedItems = (items) => {
  return items.map(item => ({
    value: item.id,
    label: item.name
  }));
};

onMounted(() => {
  getProvinceService();
  getServiceTypeService();
  getProviderTypeService();
  getClinicService();
  getSpecialityService();
});

</script>