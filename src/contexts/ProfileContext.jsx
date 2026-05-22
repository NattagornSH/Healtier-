import { createContext, useContext } from "react";
import useUserProfile from "../hooks/useUserProfile";

const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  const profileState = useUserProfile();
  return (
    <ProfileContext.Provider value={profileState}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used inside <ProfileProvider>");
  return ctx;
}
