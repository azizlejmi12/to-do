const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const parseResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Une erreur est survenue');
  }

  return data;
};

export const fetchTodos = async () => {
  const response = await fetch(`${API_BASE_URL}/todos`);
  return parseResponse(response);
};

export const addTodo = async (title) => {
  const response = await fetch(`${API_BASE_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });

  return parseResponse(response);
};

export const toggleTodo = async (id) => {
  const response = await fetch(`${API_BASE_URL}/todos/${id}/toggle`, {
    method: 'PATCH',
  });

  return parseResponse(response);
};

export const removeTodo = async (id) => {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: 'DELETE',
  });

  return parseResponse(response);
};
