import {
  AppActionTheme,
  AppActionTypesTheme,
  ThemeState,
} from "../action/theme";

const initialState: ThemeState = {
  handleSetPageSidebar: true,
  handleSetPageHeader: true,
  handleSetContent: true,
  handleSetFooter: true,
  appSidebarEndMobileToggled: false,
  appSidebarMinify: false,
};

const themes = (state: ThemeState = initialState, action: AppActionTheme) => {
  switch (action.type) {
    case AppActionTypesTheme.SIDEBAR:
      return {
        ...state,
        handleSetPageSidebar: action.payload,
      };
    case AppActionTypesTheme.HEADER:
      return {
        ...state,
        handleSetPageHeader: action.payload,
      };
    case AppActionTypesTheme.CONTENT:
      return {
        ...state,
        handleSetContent: action.payload,
      };
    case AppActionTypesTheme.FOOTER:
      return {
        ...state,
        handleSetFooter: action.payload,
      };
    case AppActionTypesTheme.TOOGLESIDEBAR:
      return {
        ...state,
        appSidebarEndMobileToggled: action.payload,
      };
    case AppActionTypesTheme.SIDERBARMINIFY:
      return {
        ...state,
        appSidebarMinify: action.payload,
      };
    default:
      return state;
  }
};

export default themes;
