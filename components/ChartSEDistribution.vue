<template>
  <div class="chart-container">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js'

Chart.register(DoughnutController, ArcElement, Tooltip, Legend)

const canvas = ref(null)

onMounted(() => {
  new Chart(canvas.value, {
    type: 'doughnut',
    data: {
      labels: ['코딩 (~43%)', '테스팅 (~15%)', '프로그램 리페어 (~12%)', '취약점 탐지 (~8%)', '코드 요약 (~7%)', '기타 (~15%)'],
      datasets: [{
        data: [43, 15, 12, 8, 7, 15],
        backgroundColor: ['#4fc3f7', '#81c784', '#ffb74d', '#e57373', '#ba68c8', '#90a4ae'],
        borderColor: '#1a1a2e',
        borderWidth: 2,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: { color: '#e0e0e0', font: { size: 14 }, padding: 16 }
        },
        title: {
          display: true,
          text: 'SE 벤치마크 분포 (291개, 2025)',
          color: '#e0e0e0',
          font: { size: 16 }
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
