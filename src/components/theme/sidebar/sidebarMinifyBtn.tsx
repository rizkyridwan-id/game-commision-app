import { RootState, themesActions, ThemeState } from "../../../reduxStore";
import { useDispatch, useSelector, Link } from "../../../package";

const SidebarMinifyBtn = () => {
  const dispatch = useDispatch();
  const theme = useSelector<RootState<string>, ThemeState>(
    (state) => state.theme
  );
  return (
    <div className="menu">
      <div className="menu-item d-flex">
        <Link
          to="/"
          className="app-sidebar-minify-btn ms-auto"
          onClick={() =>
            dispatch(themesActions.appSidebarMinify(!theme.appSidebarMinify))
          }
        >
          <i className="fa fa-angle-double-left"></i>
        </Link>
      </div>
    </div>
  );
};

export default SidebarMinifyBtn;
