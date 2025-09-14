// src/lib/api.ts

import axios from 'axios';
import { type LoginDto } from './types';

// --- THIS IS THE FIX ---
// 1. Get the base URL from the environment variable.
const backendUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001')
  // 2. Defensively remove any trailing slash to prevent the double-slash issue.
  .replace(/\/$/, '');

// 3. Construct the final, clean API URL.
const API_URL = `${backendUrl}/api/v1`;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// --- API FUNCTIONS (No other changes needed below) ---

export const checkBackendStatus = () => api.get('/status');
export const getSystemStatus = () => api.get('/system/status');
export const getSetupToken = () => api.get('/system/setup-token');
export const getProfile = () => api.get('/auth/profile');
export const loginUser = (credentials: LoginDto) =>
  api.post('/auth/login', credentials);
export const logoutUser = () => api.post('/auth/logout');
export const registerAdmin = (data: unknown) =>
  api.post('/auth/register-admin', data);

export default api;