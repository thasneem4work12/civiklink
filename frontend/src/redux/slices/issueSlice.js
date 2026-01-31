import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { issueAPI } from '../../services/api';

// Async thunks
export const getIssues = createAsyncThunk(
  'issues/getIssues',
  async (params, { rejectWithValue }) => {
    try {
      const response = await issueAPI.getAll(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch issues');
    }
  }
);

export const getIssueById = createAsyncThunk(
  'issues/getIssueById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await issueAPI.getById(id);
      return response.data.issue;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch issue');
    }
  }
);

export const createIssue = createAsyncThunk(
  'issues/createIssue',
  async (issueData, { rejectWithValue }) => {
    try {
      const response = await issueAPI.create(issueData);
      return response.data.issue;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to create issue');
    }
  }
);

export const updateIssue = createAsyncThunk(
  'issues/updateIssue',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await issueAPI.update(id, data);
      return response.data.issue;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to update issue');
    }
  }
);

export const deleteIssue = createAsyncThunk(
  'issues/deleteIssue',
  async (id, { rejectWithValue }) => {
    try {
      await issueAPI.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to delete issue');
    }
  }
);

export const verifyIssue = createAsyncThunk(
  'issues/verifyIssue',
  async (id, { rejectWithValue }) => {
    try {
      const response = await issueAPI.verify(id);
      return response.data.issue;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to verify issue');
    }
  }
);

export const getMyIssues = createAsyncThunk(
  'issues/getMyIssues',
  async (params, { rejectWithValue }) => {
    try {
      const response = await issueAPI.getMyIssues(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch your issues');
    }
  }
);

const issueSlice = createSlice({
  name: 'issues',
  initialState: {
    issues: [],
    myIssues: [],
    currentIssue: null,
    loading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 20,
      total: 0,
      pages: 0,
    },
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentIssue: (state) => {
      state.currentIssue = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Issues
      .addCase(getIssues.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIssues.fulfilled, (state, action) => {
        state.loading = false;
        state.issues = action.payload.issues;
        state.pagination = action.payload.pagination;
      })
      .addCase(getIssues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Issue By ID
      .addCase(getIssueById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIssueById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentIssue = action.payload;
      })
      .addCase(getIssueById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Issue
      .addCase(createIssue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createIssue.fulfilled, (state, action) => {
        state.loading = false;
        state.issues.unshift(action.payload);
      })
      .addCase(createIssue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Issue
      .addCase(updateIssue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateIssue.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.issues.findIndex(i => i.id === action.payload.id);
        if (index !== -1) {
          state.issues[index] = action.payload;
        }
        if (state.currentIssue?.id === action.payload.id) {
          state.currentIssue = action.payload;
        }
      })
      .addCase(updateIssue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Issue
      .addCase(deleteIssue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteIssue.fulfilled, (state, action) => {
        state.loading = false;
        state.issues = state.issues.filter(i => i.id !== action.payload);
      })
      .addCase(deleteIssue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Verify Issue
      .addCase(verifyIssue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyIssue.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.issues.findIndex(i => i.id === action.payload.id);
        if (index !== -1) {
          state.issues[index] = action.payload;
        }
        if (state.currentIssue?.id === action.payload.id) {
          state.currentIssue = action.payload;
        }
      })
      .addCase(verifyIssue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get My Issues
      .addCase(getMyIssues.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyIssues.fulfilled, (state, action) => {
        state.loading = false;
        state.myIssues = action.payload.issues;
        state.pagination = action.payload.pagination;
      })
      .addCase(getMyIssues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearCurrentIssue } = issueSlice.actions;
export default issueSlice.reducer;
