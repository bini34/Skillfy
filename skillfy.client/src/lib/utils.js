export function toArray(data) {
  if (Array.isArray(data)) return data;
  if (data?.$values) return data.$values;
  return [];
}

export function extractApiError(error) {
  if (typeof error === 'string') return error;
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.response?.data?.Message) return error.response.data.Message;
  if (error?.message) return error.message;
  return 'An unexpected error occurred.';
}
