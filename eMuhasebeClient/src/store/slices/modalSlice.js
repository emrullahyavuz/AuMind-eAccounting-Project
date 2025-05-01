import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAddModalOpen: false,
  isEditModalOpen: false,
  isDeleteModalOpen: false,
  selectedCompany: null,
  companyToDelete: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openAddModal: (state) => {
      state.isAddModalOpen = true;
    },
    closeAddModal: (state) => {
      state.isAddModalOpen = false;
    },
    openEditModal: (state, action) => {
      state.isEditModalOpen = true;
      state.selectedCompany = action.payload;
    },
    closeEditModal: (state) => {
      state.isEditModalOpen = false;
      state.selectedCompany = null;
    },
    openDeleteModal: (state, action) => {
      state.isDeleteModalOpen = true;
      state.companyToDelete = action.payload;
    },
    closeDeleteModal: (state) => {
      state.isDeleteModalOpen = false;
      state.companyToDelete = null;
    },
  },
});

export const {
  openAddModal,
  closeAddModal,
  openEditModal,
  closeEditModal,
  openDeleteModal,
  closeDeleteModal,
} = modalSlice.actions;

export default modalSlice.reducer;
