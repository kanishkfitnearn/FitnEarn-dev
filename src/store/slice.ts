import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface SeatState {
  seatCounter: number;
  sessionPrize: number;
  formattedDate: string | null; // Add this
  timeSlot: string | null; // Add this
  invitees: string[];
  requestedInvitees: string[];
  userEmailFromAPI: string | null;
  coachCategory: string | null;
  publicSessionPrice: number | null;
  privateSessionDiscount: number | null;
}

// Set initial values
const initialState: SeatState = {
  seatCounter: 1, // Starts from 1
  sessionPrize: 450, // Default prize per seat
  formattedDate: null, // Initially null
  timeSlot: null, // Initially null
  invitees: [],
  requestedInvitees: [],
  userEmailFromAPI: null,
  coachCategory: null,
  publicSessionPrice: null,
  privateSessionDiscount: null,
};

export const seatSlice = createSlice({
  name: "seat",
  initialState,
  reducers: {
    incrementSeat: (state) => {
      if (state.seatCounter < 10) {
        state.seatCounter += 1;
        state.sessionPrize = state.seatCounter * 450; // Recalculate session prize
      }
    },
    decrementSeat: (state) => {
      if (state.seatCounter > 1) {
        state.seatCounter -= 1;
        state.sessionPrize = state.seatCounter * 450; // Recalculate session prize
      }
    },
    setSeatCounter: (state, action: PayloadAction<number>) => {
      const newSeatCounter = action.payload;
      if (newSeatCounter >= 1 && newSeatCounter <= 10) {
        state.seatCounter = newSeatCounter;
        state.sessionPrize = newSeatCounter * 450; // Recalculate session prize
      }
    },
    setFormattedDate: (state, action: PayloadAction<string>) => {
      state.formattedDate = action.payload;
    },
    setTimeSlot: (state, action: PayloadAction<string>) => {
      state.timeSlot = action.payload;
    },
    addInvitee: (state, action: PayloadAction<string[]>) => {
      // Ensure no duplicates are added
      const newInvitees = action.payload.filter(
        (invitee) => !state.invitees.includes(invitee),
      );
      state.invitees = [...state.invitees, ...newInvitees]; // Add new invitees
    },
    addRequestedInvitees: (state, action: PayloadAction<string[]>) => {
      const newRequestedInvitees = action.payload.filter(
        (invitee) => !state.requestedInvitees.includes(invitee),
      );
      state.requestedInvitees = [
        ...state.requestedInvitees,
        ...newRequestedInvitees,
      ];
    },
    // Remove invitee from the list
    removeInvitee: (state, action: PayloadAction<string>) => {
      state.invitees = state.invitees.filter(
        (invitee) => invitee !== action.payload,
      );
    },
    // Reset invitees
    resetInvitees: (state) => {
      state.invitees = [];
    },
    setUserEmailFromAPI: (state, action: PayloadAction<string | null>) => {
      state.userEmailFromAPI = action.payload;
    },
    setCoachCategory: (state, action: PayloadAction<string | null>) => {
      state.coachCategory = action.payload;
    },
    setPublicSessionPrice: (state, action) => {
      state.publicSessionPrice = action.payload;
    },
    setPrivateSessionPrice: (state, action) => {
      state.sessionPrize = action.payload;
    },
    setPrivateSessionDiscount: (state, action) => {
      state.privateSessionDiscount = action.payload;
    },
  },
});

// Export the actions
export const {
  incrementSeat,
  decrementSeat,
  setSeatCounter,
  setFormattedDate,
  setTimeSlot,
  addInvitee,
  removeInvitee,
  resetInvitees,
  setUserEmailFromAPI,
  setCoachCategory,
  setPublicSessionPrice,
  addRequestedInvitees,
  setPrivateSessionDiscount,
  setPrivateSessionPrice,
} = seatSlice.actions;

// Export the reducer
export default seatSlice.reducer;
