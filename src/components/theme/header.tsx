import DropdownProfile from "./header/profile";
import { RootState, ThemeState, themesActions } from "../../reduxStore";
import { useSelector, useDispatch } from "../../package";
import { convertDate } from "@/utils";

const Header = () => {
  const dispatch = useDispatch();
  const theme = useSelector<RootState<string>, ThemeState>(
    (state) => state.theme
  );

  return (
    <div id="header" className="app-header">
      {/* BEGIN navbar-header */}
      <div className="navbar-header">
        <a href="index.html" className="navbar-brand">
          <span className="navbar-logo" />
          Color Admin Base
        </a>
        <button
          type="button"
          className="navbar-mobile-toggler"
          data-toggle="app-sidebar-mobile"
          onClick={() =>
            dispatch(
              themesActions.appSidebarEndMobileToggled(
                !theme.appSidebarEndMobileToggled
              )
            )
          }
        >
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
      </div>
      {/* END navbar-header */}
      {/* BEGIN header-nav */}

      <div className="navbar-nav">
        <li className="navbar-form">
          <div className="form-group mt-1">
            <input
              type="text"
              readOnly
              className="form-control"
              placeholder={"Tanggal System"}
              value={"Tanggal : " + convertDate(`${new Date()}`)}
            />
            <button type="button" className="btn btn-search">
              <i className="fa fa-calendar-check"> </i>
            </button>
          </div>
        </li>
        <DropdownProfile />
      </div>
      {/* END header-nav */}
    </div>
  );
};

export default Header;
