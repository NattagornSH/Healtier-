import { useState, useCallback } from "react";

const STORAGE_KEY = "healtier_user_profile";

const DEFAULT_PROFILE = {
  name: "",
  weight: "",    // kg (string so forms can bind directly)
  height: "",    // cm
  age: "",
  gender: "",    // "male" | "female"
  activityLevel: "",
};

function loadProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROFILE;
    return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PROFILE;
  }
}

function saveProfile(profile) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // ignore storage errors
  }
}

/**
 * useUserProfile
 * ──────────────
 * Provides read/write access to the persisted user profile.
 * All pages import this through ProfileContext so the same
 * instance is shared across the app.
 */
function useUserProfile() {
  const [profile, setProfileState] = useState(loadProfile);

  const updateProfile = useCallback((partial) => {
    setProfileState((prev) => {
      const next = { ...prev, ...partial };
      saveProfile(next);
      return next;
    });
  }, []);

  const clearProfile = useCallback(() => {
    setProfileState(DEFAULT_PROFILE);
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* noop */ }
  }, []);

  /** Returns true if the profile has at least weight + height filled */
  const hasBasicProfile = Boolean(profile.weight && profile.height);

  return { profile, updateProfile, clearProfile, hasBasicProfile };
}

export default useUserProfile;
