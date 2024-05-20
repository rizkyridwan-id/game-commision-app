export interface ChildrenMenu {
  icon?: string;
  path?: string;
  title: string;
  type?: string;
  exact?: boolean;
  navheader?: boolean;
  is_show?: boolean;
  children?: Array<ChildrenMenu>;
}
export interface MenuInterFace {
  path?: string;
  icon?: string;
  title?: string;
  type?: string;
  exact?: boolean;
  navheader?: boolean;
  is_show?: boolean;
  children?: Array<ChildrenMenu>;
}
