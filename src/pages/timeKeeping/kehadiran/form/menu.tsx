import { Link } from "react-router-dom";
import { PerfectScrollbar } from "../../../../package";

const MenuItem = () => {
  return (
    <div className="pos-menu">
      <div className="logo">
        <Link to="/">
          <div className="logo-img">
            <i className="fa fa-clock"></i>
          </div>
          <div className="logo-text">Time Keeping</div>
        </Link>
      </div>

      <div className="nav-container">
        <PerfectScrollbar className="h-100" options={{ suppressScrollX: true }}>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a href="#/" className={"nav-link active"}>
                <div className="nav-icon">
                  <i className={""}></i>
                </div>
                <div className="nav-text"> Kehadiran </div>
              </a>
            </li>
            <li className="nav-item">
              <a href="#/" className={"nav-link"}>
                <div className="nav-icon">
                  <i className={""}></i>
                </div>
                <div className="nav-text"> Break </div>
              </a>
            </li>
            <li className="nav-item">
              <a href="#/" className={"nav-link"}>
                <div className="nav-icon">
                  <i className={""}></i>
                </div>
                <div className="nav-text"> Sholat </div>
              </a>
            </li>
            <li className="nav-item">
              <a href="#/" className={"nav-link"}>
                <div className="nav-icon">
                  <i className={""}></i>
                </div>
                <div className="nav-text"> Istirahat </div>
              </a>
            </li>
          </ul>
        </PerfectScrollbar>
      </div>
    </div>
  );
};

export default MenuItem;
