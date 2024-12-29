<template>
  <v-card class="container justify-content-center mt-5 mb-5">
    <div class="chart-container" v-if="isDataLoaded">
      <h2>Estadísticas Mensuales</h2>
      <div class="matrix-container">
        <div class="chart-element" style="align-content: center;">
          <Bar :data="barData" :options="barOptions" class="mb-5" />
        </div>
        <div class="chart-element">
          <Line :data="activeContractsData" :options="activeContractsOptions" class="mb-5" ref="activeContractsChart" />
        </div>
        <div class="chart-element">
          <div class="selector-container">
            <v-select :items="[2023, 2024, 2025, 2026]" label="Año" v-model="selectedYear" dense />
          </div>
          <Line :data="lineData" :options="lineOptions" class="mb-5" ref="lineChart" />
        </div>
        <div class="chart-element">
          <div class="pie-chart">
            <Pie :data="pieData" :options="pieOptions" class="mb-5" />
          </div>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script setup>
import { ref, reactive, onMounted, watch, nextTick } from 'vue';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  ArcElement
} from 'chart.js';
import { Bar, Line, Pie } from 'vue-chartjs';
import dashboardService from '../views/dashboardService/dashboardService';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Filler, ArcElement, Title, Tooltip, Legend);

const lineChart = ref(null);

// Datos reactivos para los gráficos
const isDataLoaded = ref(false);
const selectedYear = ref(2024);

const barData = reactive({
  labels: [],
  datasets: [
    {
      label: 'Especies Más Registradas',
      data: [],
      backgroundColor: 'rgba(255, 159, 64, 0.6)',
      borderColor: 'rgba(255, 159, 64, 1)',
      borderWidth: 1,
      barThickness: 30,
    },
  ],
});

const lineData = reactive({
  labels: [],
  datasets: [
    {
      label: 'Comportamiento mensual',
      data: [],
      fill: true,
      backgroundColor: 'rgba(153, 102, 255, 0.5)',
      borderColor: 'rgba(153, 102, 255, 1)',
      tension: 0.3,
    },
  ],
});

const pieData = reactive({
  labels: ['Especie 1', 'Especie 2', 'Especie 3', 'Especie 4', 'Especie 5'],
  datasets: [
    {
      label: 'Especies Más Registradas',
      data: [12, 19, 3, 5, 2],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1,
    },
  ],
});

const activeContractsData = reactive({
  labels: [],
  datasets: [
    {
      label: 'Contratos Activos',
      data: [],
      fill: true,
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      borderColor: 'rgba(75, 192, 192, 1)',
      tension: 0.3,
    },
  ],
});

// Opciones para los gráficos
const barOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    title: {
      display: true,
      text: 'Mayor cantidad de Especies',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
});

const lineOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    title: {
      display: true,
      text: 'Ingresos entradas de Animales',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
});

const pieOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    title: {
      display: true,
      text: 'Especies Más Registradas',
    },
  },
});

const activeContractsOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    title: {
      display: true,
      text: 'Contratos Activos',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
});

//ESTE METODO ES ESPECIFICAMENTE PARA ACTUALIZAR EL GRAFICO DEL SELECTOR
const updateLineChart = async () => {
  try {
    // Obtener los valores mensuales para el gráfico de líneas según el año seleccionado
    const monthlyEntries = await dashboardService.getMonthEntries(selectedYear.value);

    // Actualizar los datos de las etiquetas y los valores de la línea
    lineData.labels = monthlyEntries.map((entry) => entry.month);
    lineData.datasets[0].data = monthlyEntries.map((entry) => entry.value);

    // Forzar el re-render del gráfico
    nextTick(() => {
      const chartInstance = lineChart.value?.chart;  // Obtiene la instancia del gráfico
      if (chartInstance) {
        chartInstance.data.labels = lineData.labels;
        chartInstance.data.datasets[0].data = lineData.datasets[0].data;
        chartInstance.update(); // Actualiza el gráfico
      } else {
        console.error("El gráfico no está disponible para actualizar");
      }
    });

    console.log(`Gráfico de líneas actualizado para el año ${selectedYear.value}`);
  } catch (error) {
    console.error('Error al actualizar el gráfico de líneas:', error);
  }
};

// Observar cambios en selectedYear
watch(selectedYear, async () => {
  await updateLineChart();
});

// Cargar datos al montar el componente
onMounted(async () => {
  try {
    const monthlyEntries = await dashboardService.getMonthEntries(2024);
    lineData.labels = monthlyEntries.map((entry) => entry.month);
    lineData.datasets[0].data = monthlyEntries.map((entry) => entry.value);

    const topSpecies = await dashboardService.getTopSpecies();
    barData.labels = topSpecies.map((species) => species.species);
    barData.datasets[0].data = topSpecies.map((species) => species.count);

    const contract = await dashboardService.getActiveContracts();
    console.log(contract);
    activeContractsData.labels = contract.map((contract) => contract.contract);
    activeContractsData.datasets[0].data = contract.map((contract) => contract.count);

    pieData.labels = topSpecies.map((species) => species.species);
    pieData.datasets[0].data = topSpecies.map((species) => species.count);

    isDataLoaded.value = true;
    console.log('Datos cargados exitosamente');
  } catch (error) {
    console.error('Error al cargar los datos:', error);
  }
});
</script>

<style scoped>
.matrix-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
}

.chart-container {
  width: 100%;
  padding: 20px;
}

.chart-element {
  flex: 1 1 calc(50% - 16px);
  max-width: calc(50% - 16px);
  padding: 16px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.selector-container {
  width: 100%;
  margin-bottom: 12px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.8rem;
}

.pie-chart {
  width: 100%;
  max-width: 400px;
}

@media (max-width: 1024px) {
  .chart-element {
    flex: 1 1 100%;
    max-width: 100%;
  }
}
</style>