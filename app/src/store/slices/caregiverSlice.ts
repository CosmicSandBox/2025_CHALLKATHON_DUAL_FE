import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Patient {
  id: string;
  name: string;
  avatar?: string;
  lastSeen: string;
  currentLocation?: {
    latitude: number;
    longitude: number;
    timestamp: string;
  };
  status: 'active' | 'inactive' | 'sos';
  batteryLevel: number;
  currentSpeed?: number;
}

interface BeaconLocation {
  id: string;
  patientId: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  signalStrength: number;
}

interface CaregiverState {
  patients: Patient[];
  selectedPatientId: string | null;
  beaconLocations: BeaconLocation[];
  isLoading: boolean;
  error: string | null;
  isLiveTracking: boolean;
}

const initialState: CaregiverState = {
  patients: [],
  selectedPatientId: null,
  beaconLocations: [],
  isLoading: false,
  error: null,
  isLiveTracking: false,
};

const caregiverSlice = createSlice({
  name: 'caregiver',
  initialState,
  reducers: {
    setPatients: (state, action: PayloadAction<Patient[]>) => {
      state.patients = action.payload;
    },
    selectPatient: (state, action: PayloadAction<string>) => {
      state.selectedPatientId = action.payload;
    },
    updatePatientLocation: (state, action: PayloadAction<{
      patientId: string;
      location: Patient['currentLocation'];
      status: Patient['status'];
      batteryLevel: number;
      speed?: number;
    }>) => {
      const patient = state.patients.find(p => p.id === action.payload.patientId);
      if (patient) {
        patient.currentLocation = action.payload.location;
        patient.status = action.payload.status;
        patient.batteryLevel = action.payload.batteryLevel;
        patient.currentSpeed = action.payload.speed;
        patient.lastSeen = new Date().toISOString();
      }
    },
    addBeaconLocation: (state, action: PayloadAction<BeaconLocation>) => {
      state.beaconLocations.push(action.payload);
    },
    setBeaconLocations: (state, action: PayloadAction<BeaconLocation[]>) => {
      state.beaconLocations = action.payload;
    },
    startLiveTracking: (state) => {
      state.isLiveTracking = true;
    },
    stopLiveTracking: (state) => {
      state.isLiveTracking = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setPatients,
  selectPatient,
  updatePatientLocation,
  addBeaconLocation,
  setBeaconLocations,
  startLiveTracking,
  stopLiveTracking,
  setLoading,
  setError,
} = caregiverSlice.actions;

export default caregiverSlice.reducer; 