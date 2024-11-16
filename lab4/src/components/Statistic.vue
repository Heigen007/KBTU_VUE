<template>
      <div class="row items-center justify-between" style="background-color: aliceblue;">
        <q-btn flat icon="arrow_back" label="Back" color="primary" @click="goBack" class="text-bold" />
        <h4 class="text-h5 text-primary" style="margin-right: 20px">Statistics</h4>
      </div>
  
      <div style="background-color: aliceblue;">
        <q-card flat bordered class="q-pa-md shadow-1">
          <q-card-section>
            <div class="row q-gutter-md">
              <q-date
                v-model="selectedDateRange"
                range
                bordered
                clearable
                mask="YYYY-MM-DD"
                label="Select Date Range"
                @input="fetchStatistics"
                color="primary"
                class="full-width"
              />
            </div>
            <q-separator spaced />
            <div class="q-mt-md text-center">
              <canvas id="statisticsChart"></canvas>
            </div>
          </q-card-section>
        </q-card>
      </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import Chart from 'chart.js/auto';
  import { getByUserId } from '@/storage/auth';
  
  const router = useRouter();
  const route = useRoute();
  const selectedDateRange = ref({ from: null, to: null });
  const chart = ref(null);
  
  const goBack = () => {
    router.back();
  };
  
  const currentUser = ref(getByUserId(route.params.userId));
  const userComments = ref(currentUser.value ? currentUser.value.comments : []);
  
  const fetchStatistics = async () => {
    if (selectedDateRange.value.from && selectedDateRange.value.to) {
      const data = filterDataByRange(selectedDateRange.value);
      updateChart(data);
    }
  };
  
  const filterDataByRange = (range) => {
    const fromDate = new Date(range.from);
    const toDate = new Date(range.to);
  
    const dateCounts = {};
    userComments.value.forEach((comment) => {
      const commentDate = new Date(comment.PubDate);
      if (commentDate >= fromDate && commentDate <= toDate) {
        const dateKey = comment.PubDate;
        dateCounts[dateKey] = (dateCounts[dateKey] || 0) + 1;
      }
    });
  
    return {
      labels: Object.keys(dateCounts),
      data: Object.values(dateCounts),
    };
  };
  
  const updateChart = (data) => {
    if (chart.value) chart.value.destroy();
    drawChart(data);
  };
  
  watch(selectedDateRange, () => {
    if(!selectedDateRange.value) return;
    
    if (selectedDateRange.value.from && selectedDateRange.value.to) {
      fetchStatistics();
    }
  });
  
  onMounted(() => {
    const initialData = filterDataByRange({ from: '2024-01-01', to: '2024-12-31' });
    drawChart(initialData);
  });
  
  function drawChart(data) {
    const ctx = document.getElementById('statisticsChart').getContext('2d');
    chart.value = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'Comments Count by Date',
            backgroundColor: '#76C5E7',
            data: data.data,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: { display: true, text: 'Date' },
          },
          y: {
            title: { display: true, text: 'Comments Count' },
          },
        },
      },
    });
  }
  </script>
  
  <style scoped>
  .q-page {
    background-color: #f9f9f9;
  }
  .q-card {
    max-width: 800px;
    margin: auto;
  }
  </style>
  