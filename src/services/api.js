import axios from 'axios';
import {
  statsData,
  activitiesByPeriod,
  productsByPeriod,
  schedulesData,
  decorativeAvatars,
  transactionsList,
  usersList
} from '../data/dashboardData';

export const apiClient = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getDashboardData = async (period = "May - June 2021", simulateError = false) => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        if (simulateError) {
          throw new Error("Simulated network failure. Could not connect to API server.");
        }

        const response = {
          status: 200,
          statusText: "OK",
          data: {
            stats: statsData,
            activities: activitiesByPeriod[period] || activitiesByPeriod["May - June 2021"],
            products: productsByPeriod[period] || productsByPeriod["May - June 2021"],
            schedules: schedulesData,
            avatars: decorativeAvatars,
            transactions: transactionsList,
            users: usersList,
            lastUpdated: new Date().toISOString()
          }
        };

        resolve(response.data);
      } catch (err) {
        reject(err);
      }
    }, 400);
  });
};

export const getTransactions = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(transactionsList), 300);
  });
};

export const getUsers = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(usersList), 300);
  });
};

export default {
  getDashboardData,
  getTransactions,
  getUsers
};
