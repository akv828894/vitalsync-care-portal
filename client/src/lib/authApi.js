import { apiRequest } from "./api";

export const registerUser = (payload) =>
  apiRequest("/api/auth/register", {
    method: "POST",
    body: payload,
  });

export const loginUser = (payload) =>
  apiRequest("/api/auth/login", {
    method: "POST",
    body: payload,
  });

export const fetchCurrentUser = (token) =>
  apiRequest("/api/auth/me", {
    token,
  });

export const fetchPatientOverview = (token) =>
  apiRequest("/api/patients/overview", {
    token,
  });
