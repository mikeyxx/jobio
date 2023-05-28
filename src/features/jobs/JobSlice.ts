import { createSlice } from "@reduxjs/toolkit";
import { Job } from "../../utils/DataTypes";

interface JobState {
  jobs: Job[];
  job: Job | null;
  jobToApply: Job[];
  isCreated: boolean;
  editJob: Job | null;
}

const initialState: JobState = {
  jobs: [],
  job: null,
  jobToApply: [],
  isCreated: false,
  editJob: null,
};

export const JobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    getJobs: (state, action) => {
      state.jobs = action.payload;
    },
    getJob: (state, action) => {
      state.job = action.payload;
    },
    onSuccess: (state) => {
      state.isCreated = true;
    },
    hitReset: (state) => {
      state.isCreated = false;
    },
    onUpdate: (state, action) => {
      state.editJob = action.payload;
    },
    apply: (state, action) => {
      state.jobToApply = action.payload;
    },
  },
});

export const { getJobs, getJob, onSuccess, hitReset, onUpdate, apply } =
  JobSlice.actions;
export default JobSlice.reducer;
