<template>
    <div class="chart-container">
      <h2>Estadísiticas Mensuales</h2>
      <Bar :data="barData" :options="barOptions" class="mb-5"/>
      <v-divider />
      <Line :data="lineData" :options="lineOptions" class="mb-5"/>
      <v-divider />
      <div class="pie-chart">
        <Pie :data="pieData" :options="pieOptions" class="mb-5"/>
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
  labels: ['Enero', 'Febrero', 'Marzo'],
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
  labels: ['Enero', 'Febrero', 'Marzo'],
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
  labels: ['Enero', 'Febrero', 'Marzo'],
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
  margin: auto;
  height: auto;
  padding: 5%;
  margin-left: auto;
  margin-right: auto;
  gap: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

.pie-chart {
  justify-content: center;
  width: 80%;
  margin-left: 10%;
  height: auto;
}
</style>
