<template>
	<v-card class="container justify-content-center mt-5 mb-5">
		<!-- Aqui tenemos el titulo de la tabla que es variable y el buscador -->
		<v-card-title>  
			<span class="headline">{{ title }}</span>
		</v-card-title>
		<v-spacer></v-spacer>
		<v-container class="d-flex flex-row align-center justify-space-between">
			<v-text-field 
					v-model="search" 
					label="Buscar" 
					prepend-icon="mdi-magnify" 
					single-line
					hide-details>
				</v-text-field>
				<v-btn 
					v-if="filters"
					class="ml-5"
					icon="mdi-filter" 
					:color="showFiltros ? '#217282' : '#1A3E45'" 
					@click="showFiltros = !showFiltros">
 
				</v-btn>
		</v-container>

		<!-- Filtros dinámicos -->
		<div v-if="filters" v-show="showFiltros" class="filters-container mb-4">

			<v-row>
				<v-col v-for="(filterData, filterName) in filters" :key="filterName" cols="12" sm="6" md="4">
					
					<!-- if para si es un dato de fecha -->
					<component v-if="filterName.toLowerCase().includes('date')" is="v-text-field" v-model="activeFilters[filterName]"
						:label="filterData.label" type="date" outlined dense></component>

					<!-- Para si es un dato de hora -->
					<component v-else-if="filterName === 'time'" is="v-text-field" v-model="activeFilters[filterName]"
						:label="filterData.label" type="time" outlined dense></component>

					<!-- Para si es un dato de nomenclador -->
					<component v-else-if="filterName.toLowerCase().includes('id')" is="v-autocomplete" v-model="activeFilters[filterName]" :label="filterData.label"
						:items="['0', ...filterData.lista]" outlined dense></component>

					<!-- Para datos numericos -->
					<component v-else  is="v-text-field" type="number" v-model="activeFilters[filterName]" :label="filterData.label"
						outlined dense></component>
				</v-col>
			</v-row>

			<!-- Boton para limpiar los filtros -->
			<v-btn @click="clearFilters()" color="error" prepend-icon="mdi-delete" variant="tonal">
				Limpiar Filtros
			</v-btn>
		</div>

		<!-- Tabla de Datos 
		 el loading en false se puede implementar en un futuro, es para que la tabla haga animacion de carga cuando hace una peticion
		 Lo otro importante es el update options llama a la funcion loadItems, se llama siempre que se filtre o se pagine-->
		<v-data-table-server 
			:headers="headers" 
			:items="filteredItems" 
			:search="search" 
			:hover="true" 
			:loading="false"
			:items-length="itemsLength"
			v-model:items-per-page="utilDataStore.itemsPerPage"
			v-model:page="utilDataStore.page"
			v-model="selected"
			@update:options="loadItems"

			height="360">
			
			<template v-slot:top>
				<v-toolbar  :elevation="1">
					<v-toolbar-title>Tabla</v-toolbar-title>
					<v-btn color="#1A3E45" @click="handleAction('add', animalDefault, 'Agregar')" prependIcon="mdi-plus">
						Agregar
					</v-btn>
				</v-toolbar>
			</template>

			<!-- para cuando no hay datos -->
			<template v-slot:no-data>
				<v-alert>No hay datos disponibles.</v-alert>
			</template>
			
				<template v-slot:item.actions="{ item }">
				<div class= "flex-column pa-2">
    				<v-btn-group
      					variant="outlined"
      					divided
    				>
						<!-- Los botones del crud llaman a unas funciones que se encargan de implementar la logica que existia de los check box
						basicamente seleccionan el item y llaman al HandleActions y sigue el flujo de la logica antigua -->
						<v-btn icon="mdi-eye"  @click="selectAndView(item)"></v-btn>
						<v-btn icon="mdi-pencil"  @click="selectAndEdit(item)" ></v-btn>
						<v-btn icon="mdi-delete" @click="selectAndDelete(item)"></v-btn>
					</v-btn-group>
				</div>

			</template>



		</v-data-table-server>

		<!-- Diálogo Genérico -->
		<v-dialog v-model="dialog" max-width="600">
			<v-card>
				<v-card-title class="d-flex justify-space-between align-center">
					<span>{{ dialogTitle }}</span>
				</v-card-title>
				<v-divider class="mt-0 mb-0"></v-divider>
				<v-card-text class="pl-4 pr-4 pb-4">
					<slot name="dialog-content" :item="reactive(animalTemplate)" :mode="dialogMode"></slot>
				</v-card-text>
				<v-divider class="mt-0 mb-2"></v-divider>
				<v-card-actions>
					<v-btn color="error" variant="tonal" @click="dialog = false"
						v-if="dialogMode !== 'view'">Cancelar</v-btn>
					<v-btn text color="red" variant="flat" @click="onSave"
						v-if="dialogMode === 'delete'">Eliminar</v-btn>
					<v-btn text color="primary" variant="flat" @click="onSave" v-else>Continuar</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-card>
</template>

<script setup>
import { reactive, ref, computed, watch } from "vue";
import { toRaw } from "vue";
import { defineProps, defineEmits } from "vue";

//store de pinia para los datos del paginado y demas utiles
import { useUtilDataStore } from '/src/stores/utilData.js'
const utilDataStore = useUtilDataStore();


/**
 * Props de la tabla
 */
const props = defineProps({
	title: {
		type: String,
		required: true,
	},
	items: {
		type: Array,
		required: true,
	},
	headers: {
		type: Array,
		required: true,
	},
	animalDefault: {
		type: Object,
		required: true,
	},
	filters: {
		type: Object,
		required: false,
	},
	itemsLength: {
		type: Number,
		required: true,
	},
	
	
});

//buscador del filtro
const search = ref("");

const selected = ref([]);
const dialog = ref(false);
const dialogMode = ref("");
const dialogTitle = ref("");
let animalTemplate = ref(null);
let rawSelected = null;

//variable para esconder-enseñar filtros
const showFiltros = ref(false);

/**
 * Logica de la tabla y filtros
 */


// Funcion que existia de antes que vuelve los filtros reactivos y los inicializa
//(no se como hacer para que inicialice en valores que yo quiera, les puse en 0 todos)
const activeFilters = reactive(
	Object.keys(props.filters || {}).reduce((acc, key) => {
		acc[key] = 0; // Inicializa todos los filtros como "No"
		return acc;
	}, {})
);

// otra funcion que existia antes y no entiendo
// Computed para filtrar los items según los filtros activos
const filteredItems = computed(() => {
	return props.items.filter((item) => {
		return Object.entries(activeFilters).every(([key, value]) => {
			if (value === 0) return true; // No filtra si está en "No"
			if (value === 0) return true; // No filtra si está en "" el date o la hora (backspace para borrar lo que hay en el campo de hora)
			return item[key]?.toString() === value.toString();
		});
	});
});


/**
 * Funcion para Limpiar los filtros, los deja en 0, valor por defecto
 */
 function clearFilters() {
    Object.keys(activeFilters).forEach(key => {
        activeFilters[key] = 0; // O cualquier valor que consideres como "sin filtro"
    });
    search.value = ""; // También puedes limpiar el campo de búsqueda si lo deseas
}



//atributo computado que arma el JSON que necesita el backend para pedirle las cosas filtradas
// se arma uniendo los filtros activos + el campo de busqueda + los valores del paginado
const searchCriteria = computed(() => ({
    ...activeFilters,
	searchField: search.value,
	pageNumber: utilDataStore.page - 1,
	itemsPerPage: utilDataStore.itemsPerPage,
}));

//emits (solo funciona el del update que es para filtrar y cargar datos)
const emit = defineEmits(["update", "crud"]);

//funcion que llama el update, se encarga de actualizar el Json que hay q mandarle al backend para el post de update
function loadItems(){
	utilDataStore.searchCriteria = searchCriteria
	emit("update")
}

//watch que detecta cuando cambie el JSON llama a la funcion de actualizar
watch(searchCriteria, () => {
  loadItems();
}, { deep: true });





//esto se usa?        ->   5 dias despues       sigo sin saber
const getComponent = (filterName) => {
	if (filterName === 'fecha') return VDatePicker;
	if (filterName === 'hora') return VTimePicker;
	return VSelect; // Default to v-select for other filters
};



//3 funciones crud que corresponden a los 3 botones que hay por fila en la tabla
//antes funcionaban ahora no

// FUNCIONES DEL VER, EDITAR Y ELIMINAR QUE UTILIZAN LA LOGICA DE LOS CHECK BOXES
function selectAndEdit(item) {
    // Selecciona el elemento
    selected.value = [item]; // Asigna el elemento seleccionado como un array

    // Llama a handleAction para abrir el diálogo de edición
    handleAction('edit', item, 'Editar');
}

function selectAndDelete(item) {
    // Selecciona el elemento
    selected.value = [item]; // Asigna el elemento seleccionado como un array

    // Llama a handleAction para abrir el diálogo de edición
    handleAction('delete', item, 'Eliminar');
}

function selectAndView(item) {
    // Selecciona el elemento
    selected.value = [item]; // Asigna el elemento seleccionado como un array
    // Llama a handleAction para abrir el diálogo de edición
    handleAction('view', item, 'Ver');
}


/**
 * 
 * Funciones que habian antes funcionales, las q lanzaban los formularios del crud
 * ya no funcionan
 * 
 * 
 */

function handleAction(mode, animalDefault, text) {
	dialogMode.value = mode;
	animalTemplate = { ...animalDefault };
	dialogTitle.value = text;
	if (selected != false) {
		rawSelected = selected.value.map((item) => toRaw(item))[0];
		animalTemplate = { ...rawSelected };
	}

	if (rawSelected == null) {
		if (dialogMode.value === "add") {
			animalTemplate = { ...animalDefault };
			dialog.value = true;
		} else {
			dialog.value = false;
		}
	} else {
		dialog.value = true;
		if (dialogMode.value === "add") {
			animalTemplate = { ...animalDefault };
			rawSelected = null;
		}
	}
}

function onSave() {
	emit("crud", { mode: dialogMode.value, item: animalTemplate });
	dialog.value = false;
}




</script>

<style scoped>
.filters-container {
	padding: 2%;
}

#CRUD-buttons-container {
	margin-right: 2%;
	width: 100%;
}

@media (min-width: 768px) {
	#CRUD-buttons-container {
		width: 50%;
	}
}
</style>
