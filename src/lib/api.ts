import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const fetchBlogPosts = async () => {
  const { data } = await api.get('/api/blog');
  return data;
};

export const submitLeadForm = async (formData: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) => {
  const { data } = await api.post('/api/leads', formData);
  return data;
};