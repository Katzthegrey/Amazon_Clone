export const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  modalOpen: false,
  modalType: null
};

export function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_REQUEST':
    case 'SIGNUP_REQUEST':
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case 'LOGIN_SUCCESS':
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        error: null,
        modalOpen: false,
        modalType: null
      };
    
    case 'LOGIN_FAILURE':
    case 'SIGNUP_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    case 'LOGOUT':
      return {
        ...initialState,
        modalOpen: false,
        modalType: null
      };
    
    case 'OPEN_MODAL':
      return {
        ...state,
        modalOpen: true,
        modalType: action.payload,
        error: null
      };
    
    case 'CLOSE_MODAL':
      return {
        ...state,
        modalOpen: false,
        modalType: null,
        error: null
      };
    
    default:
      return state;
  }
}