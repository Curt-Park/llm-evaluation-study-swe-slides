<template>
  <div class="chart-container">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  Chart, BarController, BarElement,
  LinearScale, CategoryScale, Tooltip, Legend
} from 'chart.js'

Chart.register(BarController, BarElement, LinearScale, CategoryScale, Tooltip, Legend)

const canvas = ref(null)

onMounted(() => {
  new Chart(canvas.value, {
    type: 'bar',
    data: {
      labels: ['SWE-bench Verified', 'SWE-bench Full', '외부 레포지토리'],
      datasets: [
        {
          label: '최고 정확도',
          data: [76, 71, 68],
          backgroundColor: '#e57373',
          borderRadius: 4,
        },
        {
          label: '최저 정확도',
          data: [60, 57, 50],
          backgroundColor: '#ffb74d',
          borderRadius: 4,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          min: 30, max: 85,
          ticks: { color: '#e0e0e0', callback: v => v + '%' },
          grid: { color: 'rgba(255,255,255,0.1)' },
          title: { display: true, text: '파일 경로 식별 정확도 (%)', color: '#e0e0e0' }
        },
        x: {
          ticks: { color: '#e0e0e0', font: { size: 12 } },
          grid: { display: false }
        }
      },
      plugins: {
        legend: {
          labels: { color: '#e0e0e0', font: { size: 13 } }
        }
      }
    }
  })
})
</script>

<style scoped>
.chart-container {
  width: 90%;
  max-width: 800px;
  height: 340px;
  margin: 0 auto;
}
</style>
