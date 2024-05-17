/* eslint-disable react/no-unescaped-entities */
import { useDispatch, Link, useEffect } from "../../package";
import { themesActions, useAppSelector } from "../../reduxStore";

const PageNoteFound = () => {
  const dispatch = useDispatch();
  const utility = useAppSelector((state) => state.utility);

  useEffect(() => {
    dispatch(themesActions.handleSetPageSidebar(false));
    dispatch(themesActions.handleSetPageHeader(false));

    return () => {
      dispatch(themesActions.handleSetPageHeader(true));
      dispatch(themesActions.handleSetPageSidebar(true));
    };
  }, [dispatch]);

  return (
    <div className="error">
      <div className="error-code">404</div>
      <div className="error-content">
        <div className="error-message">We couldn't find it...</div>
        <div className="error-desc mb-4">
          The page you're looking for doesn't exist. <br />
          Perhaps, there pages will help find what you're looking for.
        </div>
        <div>
          <Link
            to={utility.getIsLogin ? "/admin/dashboard" : "/"}
            className="btn btn-success px-3"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNoteFound;
