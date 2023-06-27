// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

interface User {
  // Define the properties of the user object
  id: string;
  username: string;
  email: string;
}

interface SetUserAction {
  type: typeof SET_USER;
  payload: User;
}

interface RemoveUserAction {
  type: typeof REMOVE_USER;
}

type SessionActionTypes = SetUserAction | RemoveUserAction;

export const setUser = (user: User): SessionActionTypes => ({
  type: SET_USER,
  payload: user,
});

export const removeUser = (): SessionActionTypes => ({
  type: REMOVE_USER,
});

interface SessionState {
  user: User | null;
}

const initialState: SessionState = { user: null };

export const authenticate = () => async (dispatch: AnyAction) => {
  const response = await fetch("/api/auth/", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
};

export const login =
  (username: string, password: string) =>
  async (dispatch: Dispatch<AnyAction>) => {
    const response = await fetch(
      "http://localhost:8080/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      dispatch(setUser(data));
      return null;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
  };

export const logout = () => async (dispatch: Dispatch<AnyAction>) => {
  const response = await fetch(
    "http://localhost:8080/users/sign-out",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.ok) {
    dispatch(removeUser());
  }
};

export const signUp =
  (
    username: string,
    email: string,
    password: string,
    repeatPassword: string
  ) =>
  async (dispatch: Dispatch<AnyAction>) => {
    const response = await fetch(
      "http://localhost:8080/users/sign-up",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          repeat_password: repeatPassword,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      dispatch(setUser(data));
      return null;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
  };

export default function reducer(
  state = initialState,
  action: SessionActionTypes
): SessionState {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload };
    case REMOVE_USER:
      return { user: null };
    default:
      return state;
  }
}
