import React, {
  MouseEventHandler,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";
// import { slideToggle } from "../helpers/slideToggle";

interface PanelState {
  expand: boolean;
  reload: boolean;
  remove: boolean;
  toggleExpand: () => void;
  toggleReload: MouseEventHandler<HTMLButtonElement>;
  toggleRemove: () => void;
  toggleCollapse: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const PanelStat = createContext<PanelState>({} as PanelState);

interface panel {
  children: ReactNode;
  className?: string;
  theme?: string;
}

// const PanelHeader: React.FC<PanelHeaderProps> = ({
const Panel: React.FC<panel> = ({ theme, className, children }) => {
  const [expand, setExpand] = useState(false);
  const [reload, setReload] = useState(false);
  const [remove, setRemove] = useState(false);

  const toggleExpand = () => {
    setExpand(!expand);
  };

  const toggleRemove = () => {
    setRemove(!remove);
  };

  const toggleReload = () => {
    if (!reload) {
      setReload(true);

      setTimeout(() => {
        setReload(false);
      }, 2000);
    }
  };

  const panelState: PanelState = {
    expand,
    reload,
    remove,
    toggleExpand,
    toggleReload,
    toggleRemove,
    toggleCollapse: undefined,
  };

  if (remove) {
    return null;
  }

  return (
    <PanelStat.Provider value={panelState}>
      <div
        className={`panel panel-${theme ? theme : "inverse"} ${
          expand ? "panel-expand" : ""
        } ${reload ? "panel-loading" : ""} ${className ? className : ""}`}
      >
        {children}
      </div>
    </PanelStat.Provider>
  );
};

interface PanelHeaderProps {
  className?: string;
  back?: boolean;
  handleBack?: () => void;
  noButton?: boolean;
  refresh?: boolean | false;
  hidden?: boolean;
  children: ReactNode;
}

const PanelHeader: React.FC<PanelHeaderProps> = ({
  className,
  back,
  handleBack,
  noButton,
  refresh,
  hidden,
  children,
}) => {
  const { reload, toggleCollapse, toggleReload } = useContext(PanelStat);

  const enabled = toggleCollapse ? true : false;
  return (
    <div className={`panel-heading ${className || ""}`}>
      <h4 className="panel-title">
        {back && (
          <>
            <i
              style={{ cursor: "pointer" }}
              className="fa fa-arrow-left"
              onClick={handleBack}
            ></i>{" "}
            &nbsp;
          </>
        )}
        {children}
      </h4>
      {!noButton && (
        <div className="panel-heading-btn">
          {refresh && (
            <>
              <button
                className="btn btn-xs btn-icon btn-circle btn-success"
                onClick={toggleReload}
              >
                <i className={`fa fa-redo ${reload ? "fa-spin" : ""}`}></i>
              </button>
              &nbsp;&nbsp;
            </>
          )}
          {hidden && (
            <button
              className="btn btn-xs btn-icon btn-circle btn-warning"
              onClick={toggleCollapse}
            >
              <i
                className={`fa ${enabled ? "fa-minus" : "fa-angle-down fa-lg"}`}
                onClick={toggleCollapse}
              ></i>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

interface PanelBodyProps {
  className?: string;
  children: ReactNode;
  hidden?: boolean;
}

const PanelBody: React.FC<PanelBodyProps> = ({ className, children }) => {
  const { reload } = useContext(PanelStat);

  return (
    <div className={`panel-body ${className || ""}`}>
      {children}

      {reload && (
        <div className="panel-loader">
          <span className="spinner spinner-sm"></span>
        </div>
      )}
    </div>
  );
};

interface PanelFooterProps {
  className?: string;
  children: ReactNode;
}

const PanelFooter: React.FC<PanelFooterProps> = ({ className, children }) => {
  return <div className={`panel-footer ${className || ""}`}>{children}</div>;
};

interface PanelContentProps {
  refresh?: boolean | false;
  back?: boolean;
  namaForm?: string;
  hideForm?: boolean;
  handleBack?: () => void;
  menu?: React.ReactNode;
  title?: React.ReactNode;
  children: ReactNode;
}

const PanelContent: React.FC<PanelContentProps> = ({
  refresh,
  back,
  //   namaForm,
  hideForm,
  handleBack,
  menu,
  title,
  children,
}) => {
  return (
    <div>
      <Panel>
        <PanelHeader
          back={back}
          handleBack={handleBack}
          noButton={!refresh && !hideForm}
          hidden={hideForm}
        >
          {menu || title}
        </PanelHeader>
        <PanelBody hidden={hideForm}>{children}</PanelBody>
      </Panel>
    </div>
  );
};

export { Panel, PanelHeader, PanelBody, PanelFooter, PanelContent, PanelStat };
