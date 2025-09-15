// src/lib/api.ts

import axios from 'axios';
import { type LoginDto } from './types';

const backendUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001')
  .replace(/\/$/, '');

const API_URL = `${backendUrl}/api/v1`;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// --- API FUNCTIONS ---

export const checkBackendStatus = () => api.get('/status');
export const getSystemStatus = () => api.get('/system/status');
export const getSetupToken = () => api.get('/system/setup-token');
export const getProfile = () => api.get('/auth/profile');
export const loginUser = (credentials: LoginDto) =>
  api.post('/auth/login', credentials);
export const logoutUser = () => api.post('/auth/logout');
export const registerAdmin = (data: unknown) =>
  api.post('/auth/register-admin', data);

// --- NEW FUNCTIONS ---
export const createStaff = (data: unknown) => api.post('/staff', data);
export const createPatient = (data: unknown) => api.post('/patients/register', data);
// --- ADD THIS NEW FUNCTION ---
export const findStaffById = (staffId: string) => api.get(`/staff/search-by-id/${staffId}`);

export default api;