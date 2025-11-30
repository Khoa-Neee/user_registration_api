const API_BASE_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:3000';

interface ApiErrorPayload {
  message?: string | string[];
  statusCode?: number;
}

export async function apiFetch<TResponse>(path: string, options?: RequestInit): Promise<TResponse> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers ?? {}),
      },
      ...options,
    });
  } catch (error) {
    throw new Error('Không thể kết nối tới máy chủ');
  }

  if (!response.ok) {
    let errorMessage = 'Đã xảy ra lỗi không xác định';
    try {
      const payload = (await response.json()) as ApiErrorPayload;
      if (Array.isArray(payload.message)) {
        errorMessage = payload.message.join(', ');
      } else if (payload.message) {
        errorMessage = payload.message;
      }
    } catch (error) {
      // Giữ nguyên lỗi mặc định nếu phản hồi không phải JSON
    }
    throw new Error(errorMessage);
  }

  if (response.status === 204) {
    return undefined as TResponse;
  }

  return (await response.json()) as TResponse;
}
