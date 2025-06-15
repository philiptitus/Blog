import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Blog } from '../types/blog.types';

const API_URL = 'https://www.mrphilip.cv/api/blogs/';

// Export the action type for use in the slice
export const FETCH_BLOGS = 'blogs/fetchBlogs';

// Create and export the async thunk
export const fetchBlogs = createAsyncThunk<Blog[], void, { rejectValue: string }>(
  FETCH_BLOGS,
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Blog[]>(API_URL);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
); 