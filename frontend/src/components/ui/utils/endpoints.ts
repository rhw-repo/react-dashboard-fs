const BASE_URL = import.meta.env.VITE_API_URL as string;

export const API_ENDPOINTS = {
people: `${BASE_URL}/api/people`,

} as const;
