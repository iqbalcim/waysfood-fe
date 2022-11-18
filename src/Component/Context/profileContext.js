import { createContext, useReducer } from "react";

export const ProfileContext = createContext();

const initialState = {
  user:null ,
  partner:null,
};

const reducer = (_, action) => {
  const { type, payload } = action;

  switch (type) {
    case "EDIT_USER":
      return {
        user: payload,
      };
      case "EDIT_PARTNER":
      return {
        partner: payload,
      };
    default:
      throw new Error();
  }
};

export const ProfileContextProvider = ({ children }) => {
  const [dataProfile, dispatch] = useReducer(reducer, initialState);

  return (
    <ProfileContext.Provider value={[dataProfile, dispatch]}>
      {children}
    </ProfileContext.Provider>
  );
};