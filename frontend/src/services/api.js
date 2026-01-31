import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear auth and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ============ AUTH ENDPOINTS ============
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
  changePassword: (data) => api.post('/auth/change-password', data),
  refreshToken: () => api.post('/auth/refresh'),
};

// ============ ISSUE ENDPOINTS ============
export const issueAPI = {
  getAll: (params) => api.get('/issues', { params }),
  getById: (id) => api.get(`/issues/${id}`),
  create: (data) => api.post('/issues', data),
  update: (id, data) => api.put(`/issues/${id}`, data),
  delete: (id) => api.delete(`/issues/${id}`),
  verify: (id) => api.post(`/issues/${id}/verify`),
  close: (id, data) => api.post(`/issues/${id}/close`, data),
  getMyIssues: (params) => api.get('/issues/my-issues', { params }),
  search: (params) => api.get('/search', { params }),
};

// ============ GOVERNMENT ENDPOINTS ============
export const governmentAPI = {
  getDashboard: () => api.get('/government/dashboard'),
  getTaggedIssues: (params) => api.get('/government/tagged-issues', { params }),
  respondToIssue: (id, data) => api.post(`/government/issues/${id}/respond`, data),
  updateIssueStatus: (id, data) => api.put(`/government/issues/${id}/status`, data),
  getPerformance: () => api.get('/government/performance'),
};

// ============ NGO ENDPOINTS ============
export const ngoAPI = {
  register: (data) => api.post('/ngo/register', data),
  getPendingApproval: () => api.get('/ngo/pending-approval'),
  getDashboard: () => api.get('/ngo/dashboard'),
  getAvailableIssues: (params) => api.get('/ngo/available-issues', { params }),
  claimIssue: (id, data) => api.post(`/ngo/issues/${id}/claim`, data),
  updateAction: (id, data) => api.put(`/ngo/issues/${id}/update-action`, data),
  getClaimedIssues: (params) => api.get('/ngo/claimed-issues', { params }),
  getProfile: (id) => api.get(`/ngo/profile/${id}`),
};

// ============ ADMIN ENDPOINTS ============
export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard'),
  getUsers: (params) => api.get('/admin/users', { params }),
  updateUserStatus: (id, data) => api.put(`/admin/users/${id}/status`, data),
  getPendingNGOs: () => api.get('/admin/ngos/pending'),
  approveNGO: (id) => api.post(`/admin/ngos/${id}/approve`),
  deleteNGO: (id) => api.delete(`/admin/ngos/${id}`),
  getMinistries: () => api.get('/admin/ministries'),
  createMinistry: (data) => api.post('/admin/ministries', data),
  updateMinistry: (id, data) => api.put(`/admin/ministries/${id}`, data),
  deleteMinistry: (id) => api.delete(`/admin/ministries/${id}`),
  deleteIssue: (id) => api.delete(`/admin/issues/${id}`),
  activateCrisis: (data) => api.post('/admin/crisis/activate', data),
  getAnalytics: (params) => api.get('/admin/analytics', { params }),
};

// ============ PUBLIC ENDPOINTS ============
export const publicAPI = {
  getStats: () => api.get('/stats'),
  getLeaderboard: () => api.get('/leaderboard'),
  getDistricts: () => api.get('/districts'),
  getCategories: () => api.get('/categories'),
  getMinistries: () => api.get('/ministries'),
  getCrisisMap: (params) => api.get('/crisis-map', { params }),
};

export default api;
