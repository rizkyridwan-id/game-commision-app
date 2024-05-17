import { AppDispatch, utilityActions } from "@/reduxStore";
import { removeItem } from "@/utils";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const DropdownProfile = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const logout = () => {
    dispatch(utilityActions.setLoading({ screen: true }));
    removeItem("userdata");
    setTimeout(() => {
      navigate("/login");
      dispatch(utilityActions.stopLoading());
      dispatch(utilityActions.isLogin(false));
    }, 1000);
  };

  return (
    <div className="navbar-item navbar-user dropdown">
      <Dropdown
        isOpen={dropdownOpen}
        toggle={toggleDropdown}
        className="mr-2"
        style={{ marginRight: "10px" }}
      >
        <DropdownToggle
          tag="span"
          data-toggle="dropdown"
          aria-expanded={dropdownOpen}
          className="navbar-link dropdown-toggle d-flex align-items-center"
        >
          <div className="avatar">S</div> &nbsp;
          <span>
            <b className="caret"></b>
          </span>
        </DropdownToggle>
        <DropdownMenu end className="dropdown-menu-end me-1">
          <DropdownItem href="#/">Edit Profile</DropdownItem>
          <DropdownItem divider />
          <DropdownItem style={{ cursor: "pointer" }} onClick={logout}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default DropdownProfile;
