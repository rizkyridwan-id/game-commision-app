import { AppDispatch, themesActions } from "@/reduxStore";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Field, change, reduxForm } from "redux-form";
import {
  KeyboardWrapper,
  NotifSuccess,
  NotificationSwal,
  NumberOnly,
  ReanderField,
  VITE_APP_BE,
  VITE_APP_KODE_TOKO,
  playSound,
  showConfirmation,
} from "@/utils";
import { Link } from "react-router-dom";
import { TypeInputOnChangeValue } from "@/interface";
import { io } from "socket.io-client";
import { SocketData } from "@/interface";
import ok from "./audio/ok.mp3";
import tryagain from "./audio/tryagain.mp3";
import beep from "./audio/beep.mp3";
import trash from "./audio/trash.mp3";

const TimeKeeping = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isShowPassword, setIsShowPassword] = useState(true);

  useEffect(() => {
    dispatch(themesActions.handleSetPageSidebar(false));
    dispatch(themesActions.handleSetPageHeader(false));

    return () => {
      dispatch(themesActions.handleSetPageHeader(true));
      dispatch(themesActions.handleSetPageSidebar(true));
    };
  }, [dispatch]);

  const [time, setTime] = useState(new Date());
  const [menu, setMenu] = useState("Kehadiran");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");
  const keyboard1 = useRef(null);
  const keyboard2 = useRef(null);
  const [input, setInput] = useState({
    pin: "",
    kode_pegawai: "",
  });
  const [focus, setFocus] = useState("kode_pegawai");

  const inputKeyBoard = (e: string) => {
    playSound(beep);
    if (focus === "kode_pegawai") {
      setInput({
        ...input,
        kode_pegawai: e,
      });
      dispatch(change("timeKeeping", "kode_pegawai", e));
    } else {
      setInput({
        ...input,
        pin: e,
      });
      dispatch(change("timeKeeping", "pin", e));
    }
  };

  const cekPin = (e: string) => {
    if (e === "{enter}") {
      // console.log(input);
      playSound(trash);
      if (input.pin !== "") {
        showConfirmation({
          title: `Konfirmasi Time Keeping <b>${menu}</b>`,
          html: `Jam  <b>${menu}</b> anda ${hours}:${minutes}:${seconds}`,
          icon: "info",
        })
          .then(() => {
            NotifSuccess(input.pin);
            setInput({
              pin: "",
              kode_pegawai: "",
            });
            setFocus("kode_pegawai");
            dispatch(change("timeKeeping", "pin", ""));
            dispatch(change("timeKeeping", "kode_pegawai", ""));
          })
          .catch((er) => {
            console.log(er);
          });
      }
    }
  };

  useEffect(() => {
    const socket = io((VITE_APP_BE as string).replace("/api/v1", ""));
    socket.connect();
    socket.on("connect", async () => {
      socket.emit("join-room", `${VITE_APP_KODE_TOKO}`);
      socket.on("fingerprint-validation", (data: SocketData) => {
        console.log(data);
        if (data.is_valid) {
          NotificationSwal({
            title: `Fingerprint Time Keeping <b>${menu}</b> Berhasil`,
            html: ``,
            icon: "success",
          });
          playSound(ok);
        } else {
          NotificationSwal({
            title: `Fingerprint Time Keeping <b>${menu}</b> Gagal`,
            html: ``,
            icon: "error",
          });
          playSound(tryagain);
        }
      });
    });
    return () => {
      socket.disconnect();
    };
  }, [menu]);

  return (
    <div>
      <div className={"pos pos-with-menu "} id="pos">
        <div className="pos-menu">
          <div className="logo">
            <Link to="#">
              <div className="logo-img">
                <i className="fa fa-clock"></i>
              </div>
              <div className="logo-text">TIME KEEPING</div>
            </Link>
          </div>
          <div className="nav-container">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a
                  href="#/"
                  className={`nav-link ${menu === "Kehadiran" ? "active" : ""}`}
                  onClick={() => setMenu("Kehadiran")}
                >
                  <div className="nav-icon">
                    <i className={""}></i>
                  </div>
                  <div className="nav-text"> Kehadiran </div>
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#/"
                  className={`nav-link ${menu === "Break" ? "active" : ""}`}
                  onClick={() => setMenu("Break")}
                >
                  <div className="nav-icon">
                    <i className={""}></i>
                  </div>
                  <div className="nav-text"> Break </div>
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#/"
                  className={`nav-link ${menu === "Sholat" ? "active" : ""}`}
                  onClick={() => setMenu("Sholat")}
                >
                  <div className="nav-icon">
                    <i className={""}></i>
                  </div>
                  <div className="nav-text"> Sholat </div>
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#/"
                  className={`nav-link ${menu === "Istirahat" ? "active" : ""}`}
                  onClick={() => setMenu("Istirahat")}
                >
                  <div className="nav-icon">
                    <i className={""}></i>
                  </div>
                  <div className="nav-text"> Istirahat </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pos-content">
          <div className="pos-content-container">
            <div className="product not-available" style={{ height: "95vh" }}>
              <div
                className="not-available-text"
                style={{ flexDirection: "column" }}
              >
                <h1 style={{ fontSize: "50px" }}>{menu}</h1>
                <h1 style={{ fontSize: "100px" }}>
                  {hours}:{minutes}:{seconds}
                </h1>
                <div>
                  <Field
                    type={"text"}
                    label=""
                    name="kode_pegawai"
                    enableenter
                    noUpperCase
                    id="kode_pegawai"
                    nouperCase
                    normalize={NumberOnly}
                    placeholder="Masukan Kode Pegawai"
                    component={ReanderField}
                    right
                    inputGroup
                    onFocus={() => setFocus("kode_pegawai")}
                    textIconGroup={<i className="fa fa-user"></i>}
                    onChange={(e: TypeInputOnChangeValue) => {
                      e.target.value === "" &&
                        setInput({
                          pin: "",
                          kode_pegawai: "",
                        });
                    }}
                    handleClick={() => setIsShowPassword(!isShowPassword)}
                  />
                </div>
                <div>
                  <Field
                    type={"text"}
                    label=""
                    name="pin"
                    enableenter
                    noUpperCase
                    id="pin"
                    nouperCase
                    placeholder="Masukan PIN"
                    component={ReanderField}
                    right
                    inputGroup
                    onChange={(e: TypeInputOnChangeValue) => {
                      e.target.value === "" &&
                        setInput({
                          pin: "",
                          kode_pegawai: "",
                        });
                    }}
                    onFocus={() => setFocus("pin")}
                    textIconGroup={
                      isShowPassword ? (
                        <i className="fa-regular fa-eye-slash"></i>
                      ) : (
                        <i className="fa fa-eye"></i>
                      )
                    }
                    customeCss={isShowPassword ? "password-hide" : ""}
                    handleClick={() => setIsShowPassword(!isShowPassword)}
                  />
                </div>
                <div style={{ width: "600px" }}>
                  {focus === "pin" && (
                    <KeyboardWrapper
                      keyboardRef={keyboard1}
                      onChange={(e) => inputKeyBoard(e)}
                      onKeyPress={(e) => cekPin(e)}
                    />
                  )}
                  {focus === "kode_pegawai" && (
                    <KeyboardWrapper
                      keyboardRef={keyboard2}
                      onChange={(e) => inputKeyBoard(e)}
                      onKeyPress={(e) => cekPin(e)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default reduxForm({
  form: "timeKeeping",
})(TimeKeeping);
