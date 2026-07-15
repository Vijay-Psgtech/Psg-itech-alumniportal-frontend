const env = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : {}

const normalizeBase = (value = '') => {
  if (!value) return 'http://localhost:5000'
  return value.replace(/\/$/, '').replace(/\/api$/, '')
}

export const API_BASE = normalizeBase(env.VITE_API_URL || '')
export const API_ROOT = `${API_BASE}/api`

const emptyList = {
  alumni: [],
  events: [],
  albums: [],
  donations: [],
  campaigns: [],
  newsletters: [],
  notifications: [],
  departments: [],
  users: [],
  responses: [],
  totalAlumni: 0,
  totalPages: 1,
  currentPage: 1,
}

const ok = (data = {}) => Promise.resolve({ data: { ...emptyList, ...data } })

const withQuery = (path, params = {}) => {
  const search = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return
    search.append(key, String(value))
  })
  const suffix = search.toString()
  return suffix ? `${path}?${suffix}` : path
}

const getStoredToken = () => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('token') || null
}

export const buildApiUrl = (path) => `${API_ROOT}${path.startsWith('/') ? path : `/${path}`}`

export const request = async (path, options = {}) => {
  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData
  const headers = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json', Accept: 'application/json' }),
    ...(options.headers || {}),
  }
  const token = getStoredToken()
  if (token && !headers.Authorization) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(buildApiUrl(path), {
    credentials: 'include',
    ...options,
    headers,
    body: options.body !== undefined && !isFormData && typeof options.body !== 'string'
      ? JSON.stringify(options.body)
      : options.body,
  })

  const contentType = response.headers.get('content-type') || ''
  const payload = contentType.includes('application/json')
    ? await response.json().catch(() => null)
    : await response.text().catch(() => null)

  if (!response.ok) {
    const error = new Error(payload?.message || 'Request failed')
    error.response = { data: payload, status: response.status }
    throw error
  }

  return { data: payload ?? {}, status: response.status, ok: response.ok }
}

const makeApi = (overrides = {}) =>
  new Proxy(overrides, {
    get(target, prop) {
      if (prop in target) return target[prop]
      return () => ok()
    },
  })

export const authAPI = makeApi({
  login: (payload) => request('/auth/login', { method: 'POST', body: payload }),
  register: (payload) => request('/auth/register', { method: 'POST', body: payload }),
  logout: () => request('/auth/logout', { method: 'POST' }),
  getProfile: () => request('/auth/profile', { method: 'GET' }),
  changePassword: (payload) => request('/auth/change-password', { method: 'PUT', body: payload }),
  forgotPassword: (payload) => request('/auth/forgot-password', { method: 'POST', body: payload }),
  verifyOtp: (payload) => request('/auth/verify-otp', { method: 'POST', body: payload }),
  resetPassword: (payload) => request('/auth/reset-password', { method: 'POST', body: payload }),
  socialLogin: (payload) => request('/auth/social-login', { method: 'POST', body: payload }),
})

export const bannerAPI = makeApi({
  getActive: () => request('/banners/active', { method: 'GET' }),
})

export const notificationScrollAPI = makeApi({
  getActive: () => request('/notification-scrolls/active', { method: 'GET' }),
})

export const adminAPI = makeApi({
  getStats: () => request('/admin/dashboard/stats', { method: 'GET' }),
  getAllAlumni: (params = {}) => request(withQuery('/admin/dashboard/alumni/all', params), { method: 'GET' }),
  getAllDonations: (params = {}) => request(withQuery('/admin/dashboard/donations/all', params), { method: 'GET' }),
  approveAlumni: (id) => request(`/admin/approve/${id}`, { method: 'PUT' }),
  rejectAlumni: (id) => request(`/admin/reject/${id}`, { method: 'PUT' }),
  getPendingAlumni: () => request('/admin/pending', { method: 'GET' }),
})

export const alumniAPI = makeApi({
  getBatches: (params = {}) => request(withQuery('/alumni/batches', params), { method: 'GET' }),
  getStats: (params = {}) => request(withQuery('/alumni/stats', params), { method: 'GET' }),
  getByBatch: (params = {}) => request(withQuery('/alumni/batch-wise', params), { method: 'GET' }),
  getById: (id) => request(`/alumni/${id}`, { method: 'GET' }),
  getProfile: () => request('/auth/profile', { method: 'GET' }),
  updateProfile: (id, payload) => {
    const isFormData = typeof FormData !== 'undefined' && payload instanceof FormData
    return request(`/alumni/${id}`, {
      method: 'PUT',
      body: payload,
      headers: isFormData ? {} : undefined,
    })
  },
})

export const eventsAPI = makeApi({
  getAll: (params = {}) => request(withQuery('/events', params), { method: 'GET' }),
  getById: (id) => request(`/events/${id}`, { method: 'GET' }),
  create: (payload) => request('/events', { method: 'POST', body: payload }),
  update: (id, payload) => request(`/events/${id}`, { method: 'PUT', body: payload }),
  delete: (id) => request(`/events/${id}`, { method: 'DELETE' }),
})

export const albumsAPI = makeApi({
  getAll: (params = {}) => request(withQuery('/albums', params), { method: 'GET' }),
  create: (payload) => request('/albums', { method: 'POST', body: payload }),
  update: (id, payload) => request(`/albums/${id}`, { method: 'PUT', body: payload }),
  delete: (id) => request(`/albums/${id}`, { method: 'DELETE' }),
})

export const campaignsAPI = makeApi({
  getAll: (params = {}) => request(withQuery('/campaigns', params), { method: 'GET' }),
  getById: (id) => request(`/campaigns/${id}`, { method: 'GET' }),
  submitResponse: (id, payload) => request(`/campaigns/${id}/responses`, { method: 'POST', body: payload }),
  getResponses: (campaignId, params = {}) => request(withQuery(`/campaigns/${campaignId}/responses`, params), { method: 'GET' }),
  exportResponses: (campaignId) => request(`/campaigns/${campaignId}/responses/export`, { method: 'GET' }),
})

export const notificationAPI = makeApi({
  getMyNotifications: () => request('/notifications/my', { method: 'GET' }),
  getMySubmissions: () => request('/notifications/submissions', { method: 'GET' }),
  adminGetAll: (status) => request(withQuery('/notifications/admin', status ? { status } : {}), { method: 'GET' }),
  getUnreadCount: () => request('/notifications/unread-count', { method: 'GET' }),
  submit: (payload) => request('/notifications', { method: 'POST', body: payload }),
})

export const donationAPI = makeApi({
  getHistory: (params = {}) => request(withQuery('/donations/history', params), { method: 'GET' }),
  getMyDonations: () => request('/donations/mine', { method: 'GET' }),
  createDonation: (payload) => request('/donations', { method: 'POST', body: payload }),
})

export const departmentAPI = makeApi({
  getAll: (params = {}) => request(withQuery('/departments', params), { method: 'GET' }),
  getAllAdmin: () => request('/departments/admin/all', { method: 'GET' }),
})

export const adminUsersAPI = makeApi({
  getAll: () => request('/users', { method: 'GET' }),
  create: (payload) => request('/users', { method: 'POST', body: payload }),
  update: (id, payload) => request(`/users/${id}`, { method: 'PUT', body: payload }),
  deleteUser: (id) => request(`/users/${id}`, { method: 'DELETE' }),
})

export const adminReportsAPI = makeApi({
  fetchAlumniDataByYear: () => request('/reports/alumni-data-by-year', { method: 'GET' }),
  fetchAlumniDataByDepartment: () => request('/reports/alumni-data-by-department', { method: 'GET' }),
})

export const newsLetterAPI = makeApi({
  getAll: (params = {}) => request(withQuery('/newsletters', params), { method: 'GET' }),
  create: (payload) => request('/newsletters', { method: 'POST', body: payload }),
  update: (id, payload) => request(`/newsletters/${id}`, { method: 'PUT', body: payload }),
  delete: (id) => request(`/newsletters/${id}`, { method: 'DELETE' }),
})
