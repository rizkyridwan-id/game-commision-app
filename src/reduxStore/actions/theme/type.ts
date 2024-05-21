import { Action } from "redux";

export const AppActionTypesTheme = {
  SIDERBARMINIFY: "SIDERBARMINIFY",
  TOOGLESIDEBAR: "TOOGLESIDEBAR",
  SIDEBAR: "SIDEBAR",
  HEADER: "HEADER",
  CONTENT: "CONTENT",
  FOOTER: "FOOTER",
} as const;

export interface appSidebarMinifyAction
  extends Action<typeof AppActionTypesTheme.SIDERBARMINIFY> {
  payload: boolean;
}
export interface appSidebarEndMobileToggledAction
  extends Action<typeof AppActionTypesTheme.TOOGLESIDEBAR> {
  payload: boolean;
}
export interface handleSetPageSidebarAction
  extends Action<typeof AppActionTypesTheme.SIDEBAR> {
  payload: boolean;
}
export interface handleSetPageHeaderAction
  extends Action<typeof AppActionTypesTheme.HEADER> {
  payload: boolean;
}
export interface handleSetContentAction
  extends Action<typeof AppActionTypesTheme.CONTENT> {
  payload: boolean;
}
export interface handleSetFooterAction
  extends Action<typeof AppActionTypesTheme.FOOTER> {
  payload: boolean;
}

export type AppActionTheme =
  | appSidebarMinifyAction
  | handleSetPageHeaderAction
  | handleSetPageSidebarAction
  | appSidebarEndMobileToggledAction
  | handleSetContentAction
  | handleSetFooterAction;
