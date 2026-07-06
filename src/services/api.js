export const API_BASE = import.meta.env.VITE_API_URL || ''

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

const makeApi = (overrides = {}) =>
  new Proxy(overrides, {
    get(target, prop) {
      if (prop in target) return target[prop]
      return () => ok()
    },
  })

export const authAPI = makeApi({
  login: () =>
    ok({
      token: 'local-demo-token',
      user: {
        id: 'local-user',
        name: 'Demo User',
        email: 'demo@psgitech.ac.in',
        role: 'admin',
        isAdmin: true,
        department: 'CSE',
        batchYear: new Date().getFullYear(),
      },
    }),
  register: () => ok({ success: true }),
  forgotPassword: () => ok({ success: true }),
  verifyOtp: () => ok({ success: true }),
  resetPassword: () => ok({ success: true }),
})

export const adminAPI = makeApi({
  getStats: () =>
    ok({
      totalAlumni: 0,
      pendingAlumni: 0,
      totalDonatedAmount: 0,
      completedDonations: 0,
      totalEvents: 0,
      totalAlbums: 0,
      totalCampaigns: 0,
    }),
  getAllAlumni: () => ok(),
  getAllDonations: () => ok(),
})

export const alumniAPI = makeApi({
  getBatches: () => ok({ batches: [] }),
  getStats: () => ok(),
  getByBatch: () => ok(),
  getProfile: () => ok({ user: null }),
  updateProfile: () => ok({ success: true }),
})

export const eventsAPI = makeApi({
  getAll: () => ok({ events: [] }),
})

export const albumsAPI = makeApi({
  getAll: () => ok({ albums: [] }),
})

export const campaignsAPI = makeApi({
  getAll: () => ok({ campaigns: [] }),
  getById: () => ok({ campaign: null }),
  getResponses: () => ok({ responses: [] }),
  exportResponses: () => ok({ url: '' }),
})

export const notificationAPI = makeApi({
  getMyNotifications: () => ok({ notifications: [] }),
  getMySubmissions: () => ok({ notifications: [] }),
  adminGetAll: () => ok({ notifications: [] }),
  getUnreadCount: () => ok({ count: 0 }),
})

export const donationAPI = makeApi({
  getHistory: () => ok({ donations: [], pagination: { page: 1, pages: 1, limit: 10, total: 0 } }),
})

export const departmentAPI = makeApi({
  getAll: () => ok({ departments: [] }),
  getAllAdmin: () => ok({ departments: [] }),
})

export const adminUsersAPI = makeApi({
  getAll: () => ok({ users: [] }),
})

export const adminReportsAPI = makeApi({
  fetchAlumniDataByYear: () => ok({ totalCount: 0, countByYear: [], allAlumni: [] }),
  fetchAlumniDataByDepartment: () => ok({ countByDepartment: [] }),
})

export const newsLetterAPI = makeApi({
  getAll: () => ok({ newsletters: [] }),
})
