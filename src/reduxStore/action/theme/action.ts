import {
  AppActionTypesTheme,
  appSidebarEndMobileToggledAction,
  appSidebarMinifyAction,
  handleSetContentAction,
  handleSetFooterAction,
  handleSetPageHeaderAction,
  handleSetPageSidebarAction,
} from "./type";

const appSidebarMinify = (data: boolean): appSidebarMinifyAction => {
  return {
    type: AppActionTypesTheme.SIDERBARMINIFY,
    payload: data,
  };
};

const appSidebarEndMobileToggled = (
  data: boolean
): appSidebarEndMobileToggledAction => {
  return {
    type: AppActionTypesTheme.TOOGLESIDEBAR,
    payload: data,
  };
};

const handleSetPageSidebar = (data: boolean): handleSetPageSidebarAction => {
  return {
    type: AppActionTypesTheme.SIDEBAR,
    payload: data,
  };
};

const handleSetPageHeader = (data: boolean): handleSetPageHeaderAction => {
  return {
    type: AppActionTypesTheme.HEADER,
    payload: data,
  };
};

const handleSetContent = (data: boolean): handleSetContentAction => {
  return {
    type: AppActionTypesTheme.CONTENT,
    payload: data,
  };
};

const handleSetFooter = (data: boolean): handleSetFooterAction => {
  return {
    type: AppActionTypesTheme.FOOTER,
    payload: data,
  };
};

const themesActions = {
  handleSetFooter,
  handleSetContent,
  handleSetPageHeader,
  handleSetPageSidebar,
  appSidebarEndMobileToggled,
  appSidebarMinify,
};

export default themesActions;
