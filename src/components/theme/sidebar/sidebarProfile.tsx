import { Link } from "../../../package";

const SidebarProfile = () => {
  return (
    <div className="menu">
      <div className="menu-profile">
        <Link to="/" className="menu-profile-link">
          <div className="menu-profile-cover with-shadow"></div>
          <div className="menu-profile-image menu-profile-image-icon bg-gray-900 text-gray-600">
            <i className="fa fa-user"></i>
          </div>
          <div className="menu-profile-info">
            <div className="d-flex align-items-center">
              <div className="flex-grow-1">Sean Ngu</div>
              <div className="menu-caret ms-auto"></div>
            </div>
            <small>Front end developer</small>
          </div>
        </Link>
      </div>
      <div id="appSidebarProfileMenu" className="collapse">
        <div className="menu-item pt-5px">
          <Link to="/" className="menu-link">
            <div className="menu-icon">
              <i className="fa fa-cog"></i>
            </div>
            <div className="menu-text">Settings</div>
          </Link>
        </div>
        <div className="menu-item">
          <Link to="/" className="menu-link">
            <div className="menu-icon">
              <i className="fa fa-pencil-alt"></i>
            </div>
            <div className="menu-text"> Send Feedback</div>
          </Link>
        </div>
        <div className="menu-item pb-5px">
          <Link to="/" className="menu-link">
            <div className="menu-icon">
              <i className="fa fa-question-circle"></i>
            </div>
            <div className="menu-text"> Helps</div>
          </Link>
        </div>
        <div className="menu-divider m-0"></div>
      </div>
    </div>
  );
};

export default SidebarProfile;
