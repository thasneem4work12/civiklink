import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Async thunks
export const fetchIssues = createAsyncThunk(
  'issues/fetchIssues',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await api.get('/issues', { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch issues');
    }
  }
);

export const createIssue = createAsyncThunk(
  'issues/createIssue',
  async (issueData, { rejectWithValue }) => {
    try {
      const response = await api.post('/issues', issueData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to create issue');
    }
  }
);

export const verifyIssue = createAsyncThunk(
  'issues/verifyIssue',
  async (issueId, { rejectWithValue }) => {
    try {
      const response = await api.post(`/issues/${issueId}/verify`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to verify issue');
    }
  }
);

const issueSlice = createSlice({
  name: 'issues',
  initialState: {
    items: [],
    currentIssue: null,
    loading: false,
    error: null,
    page: 1,
    hasMore: true,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetIssues: (state) => {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch issues
      .addCase(fetchIssues.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIssues.fulfilled, (state, action) => {
        state.loading = false;
        if (action.meta.arg?.page === 1) {
          state.items = action.payload.issues;
        } else {
          state.items = [...state.items, ...action.payload.issues];
        }
        state.hasMore = action.payload.issues.length === 20;
        state.page = action.meta.arg?.page || 1;
      })
      .addCase(fetchIssues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create issue
      .addCase(createIssue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createIssue.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload.issue);
      })
      .addCase(createIssue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Verify issue
      .addCase(verifyIssue.fulfilled, (state, action) => {
        const index = state.items.findIndex(i => i._id === action.payload.issue._id);
        if (index !== -1) {
          state.items[index] = action.payload.issue;
        }
      });
  },
});

export const { clearError, resetIssues } = issueSlice.actions;
export default issueSlice.reducer;
