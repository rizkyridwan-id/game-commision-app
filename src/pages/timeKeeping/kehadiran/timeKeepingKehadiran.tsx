import { AppDispatch, themesActions } from "@/reduxStore";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import MenuItem from "./form/menu";

const TimeKeepingKehadiran = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(themesActions.handleSetPageSidebar(false));
    dispatch(themesActions.handleSetPageHeader(false));

    return () => {
      dispatch(themesActions.handleSetPageHeader(true));
      dispatch(themesActions.handleSetPageSidebar(true));
    };
  }, [dispatch]);

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");

  return (
    <div>
      <div className={"pos pos-with-menu "} id="pos">
        <MenuItem />
        <div className="pos-content">
          <div className="pos-content-container">
            <div className="product not-available" style={{ height: "95vh" }}>
              <div className="img"></div>
              <div className="text">
                <div className="title"></div>
                <div className="desc"> </div>
                <div className="price"></div>
              </div>
              <div
                className="not-available-text"
                style={{ flexDirection: "column" }}
              >
                <h1 style={{ fontSize: "100px" }}>
                  {hours}:{minutes}:{seconds}
                </h1>
                <div>
                  <button
                    className="btn btn-primary"
                    style={{
                      marginRight: 10,
                      padding: 10,
                    }}
                  >
                    <p style={{ fontSize: 20 }}> Kode Pegawai</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeKeepingKehadiran;
