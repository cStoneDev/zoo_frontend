<template>
  <div>
    <div class="chart-container">
      <h2>Gráfico de Barras</h2>
      <Bar :data="barData" :options="barOptions" />

      <h2>Gráfico de Líneas</h2>
      <Line :data="lineData" :options="lineOptions" />

      <h2>Distribución de Ventas</h2>
      <div class="pie-chart">
        <Pie :data="pieData" :options="pieOptions" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
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
} from 'chart.js'
import { Bar, Line, Pie } from 'vue-chartjs'


ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Filler, ArcElement, Title, Tooltip, Legend)

let barData = ref({
  labels: ['January', 'February', 'March'],
  datasets: [{
    label: 'Ventas',
    data: [40, 20, 12],
    backgroundColor: 'rgba(75, 192, 192, 0.6)',
    borderColor: 'rgba(75, 192, 192, 1)',
    borderWidth: 1,
    barThickness: 30 // Ajusta el ancho de las barras
  }]
})

let barOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top'
    },
    title: {
      display: true,
      text: 'Gráfico de Ventas por Mes'
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
})

let lineData = ref({
  labels: ['January', 'February', 'March'],
  datasets: [{
    label: 'Tendencia de Ventas',
    data: [30, 25, 15],
    fill: true,
    backgroundColor: 'rgba(153, 102, 255, 0.5)',
    borderColor: 'rgba(153, 102, 255, 1)',
    tension: 0.3
  }]
})

let lineOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top'
    },
    title: {
      display: true,
      text: 'Tendencia de Ventas'
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
})

let pieData = ref({
  labels: ['January', 'February', 'March'],
  datasets: [{
    label: 'Distribución de Ventas',
    data: [40, 20, 12],
    backgroundColor: [
      'rgba(255, 99, 132, 0.6)',
      'rgba(54, 162, 235, 0.6)',
      'rgba(255, 206, 86, 0.6)'
    ],
    borderColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)'
    ],
    borderWidth: 1
  }]
})

let pieOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top'
    },
    title: {
      display: true,
      text: 'Distribución de Ventas por Mes'
    }
  }
})

</script>

<style scoped>
.chart-container {
  width: 70vw;
  /* Reduce el ancho a 80% del viewport */
  margin: auto;
  /* Centra el contenido en el contenedor */
  height: auto;
  /* Ajusta la altura automáticamente según el contenido */
  padding: 5%;
  margin-left: auto;
  /* Añade márgenes a la izquierda */
  margin-right: auto;
  /* Añade márgenes a la derecha */
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  /* Aumenta el margen inferior para separar los gráficos */
  font-size: 1.5rem;
  /* Reduce el tamaño de los títulos */
}

/* Clase para controlar el tamaño del gráfico de pastel */
.pie-chart {
  justify-content: center;
  /* Centra el gráfico horizontalmente */
  width: 80%;
  margin-left: 10%;
  /* Reduce el ancho del gráfico de pastel */
  height: auto;
}
</style>
