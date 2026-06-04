const BASE_URL = ''; // Temporarily blank as using local files
// Replace with: const BASE_URL = import.meta.env.VITE_API_URL || '';

export const API_ENDPOINTS = {
  timelineTasks: `${BASE_URL}/data.json`,
  recordsList: `${BASE_URL}/data.json`,
  // users: `${BASE_URL}/api/users`,
} as const;