import { AppDispatch, themesActions, utilityActions } from "@/reduxStore";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Field, change, reduxForm, reset } from "redux-form";
import {
  KeyboardWrapper,
  NotifInfo,
  NotificationSwal,
  NumberOnly,
  ReanderField,
  VITE_APP_BE,
  VITE_APP_KODE_TOKO,
  getData,
  playSound,
  postData,
  setFocusField,
  showConfirmation,
  speak,
  today,
  urlApi,
} from "@/utils";
import { Link } from "react-router-dom";
import { PegawaiInterface, TypeInputOnChangeValue } from "@/interface";
import { io } from "socket.io-client";
import { SocketData } from "@/interface";
import tryagain from "./audio/tryagain.mp3";
// import beep from "./audio/beep.mp3";
import trash from "./audio/trash.mp3";
import { Beep } from "@/assets";

type MenuType = "Kehadiran" | "Istirahat" | "Break" | "Sholat";

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
  const [menu, setMenu] = useState<MenuType>("Kehadiran");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");
  const keyboardRef = useRef<any>(null);

  const [input, setInput] = useState({
    pin: "",
    kode_pegawai: "",
  });
  const [activeInput, setActiveInput] = useState<"kode_pegawai" | "pin" | null>(
    "kode_pegawai"
  );

  const cekPin = (e: string) => {
    if (e === "{enter}") {
      playSound(trash);
      if (input.pin !== "" && input.kode_pegawai !== "") {
        showConfirmation({
          title: `Konfirmasi Time Keeping <b>${menu}</b>`,
          html: `Jam  <b>${menu}</b> anda ${hours}:${minutes}:${seconds}`,
          icon: "info",
        })
          .then(async () => {
            try {
              dispatch(utilityActions.setLoading({ screen: true }));
              await postData(urlApi.timeKeeping.validationPin, input);
              prosesAbsen();
            } catch (error) {
              speak(`${error}`);
              NotifInfo(`${error}`);
              dispatch(utilityActions.stopLoading());
              resetForm();
            }
          })
          .catch(() => {
            playSound(tryagain);
          });
      }
    }
  };

  const prosesAbsen = async (data?: SocketData) => {
    try {
      let url = "";
      if (menu === "Kehadiran") {
        url = urlApi.timeKeeping.kehadiran;
      } else if (menu === "Break") {
        url = urlApi.timeKeeping.break;
      } else if (menu === "Istirahat") {
        url = urlApi.timeKeeping.istirahat;
      } else {
        url = urlApi.timeKeeping.sholat;
      }

      const jam = `${new Date().getHours().toString().padStart(2, "0")}:${new Date().getMinutes().toString().padStart(2, "0")}`;
      const dataBody = {
        kode_pegawai: input.kode_pegawai || data?.kode_pegawai,
        kode_toko: VITE_APP_KODE_TOKO,
        jam: `${jam}`,
        tgl_system: today,
      };
      await postData(url, dataBody);
      const dataPegawai = await getData<PegawaiInterface>(
        urlApi.dataMaster.pegawai,
        {
          kode_pegawai: dataBody.kode_pegawai,
          first: true,
        }
      );
      // playSound(ok);
      resetForm();
      speak(
        `OK, ${dataPegawai.data.nama_pegawai}, Time Keeping ${menu} berhasil`
      );
      // NotifSuccess(
      //   `${dataPegawai.data.nama_pegawai}. Time Keeping ${menu} berhasil`
      // );
      dispatch(utilityActions.stopLoading());
      NotificationSwal({
        title: `Time Keeping <b>${menu}</b> Berhasil`,
        html: `Kode Pegawai  <b>${dataPegawai.data.kode_pegawai}</b><br/>Nama  <b>${dataPegawai.data.nama_pegawai}</b> <br/>Jam : ${jam}`,
        icon: "success",
        time: 1000000,
      })
        .then(() => {
          resetForm();
        })
        .catch(() => {
          resetForm();
        });
      resetForm();
    } catch (error) {
      speak(`${error}`);
      NotifInfo(`${error}`);
      dispatch(utilityActions.stopLoading());
      resetForm();
    }
  };

  useEffect(() => {
    const socket = io((VITE_APP_BE as string).replace("/api/v1", ""));
    socket.connect();
    socket.on("connect", async () => {
      socket.emit("join-room", `${VITE_APP_KODE_TOKO}`);
      socket.on("fingerprint-validation", (data: SocketData) => {
        if (data.is_valid) {
          prosesAbsen(data);
        } else {
          playSound(tryagain);
          NotifInfo(`Fingerprint Time Keeping ${menu} Gagal`);
        }
      });
    });
    return () => {
      socket.disconnect();
    };
  }, [menu]);

  const resetForm = () => {
    setInput({
      pin: "",
      kode_pegawai: "",
    });
    setFocusField("kode_pegawai");
    setActiveInput("kode_pegawai");
    dispatch(change("timeKeeping", "pin", ""));
    dispatch(change("timeKeeping", "kode_pegawai", ""));
    dispatch(reset("timeKeeping"));
  };

  const pindahMenu = (namaMenu: MenuType) => {
    setMenu(namaMenu);
    setInput({
      kode_pegawai: "",
      pin: "",
    });
    dispatch(change("timeKeeping", "pin", ""));
    dispatch(change("timeKeeping", "kode_pegawai", ""));
    setTimeout(() => {
      setFocusField("kode_pegawai");
    }, 100);
  };

  const handleInputFocus = (inputName: "pin" | "kode_pegawai") => {
    setActiveInput(inputName);
    keyboardRef.current.setInput(input[inputName]);
  };

  const handleChange = (keyboardInput: string) => {
    playSound(Beep);
    setInput((prevInput) => ({
      ...prevInput,
      [activeInput as "pin" | "kode_pegawai"]: keyboardInput,
    }));
    if (activeInput === "kode_pegawai") {
      dispatch(change("timeKeeping", "kode_pegawai", keyboardInput));
    } else {
      dispatch(change("timeKeeping", "pin", keyboardInput));
    }
  };

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
                  onClick={() => pindahMenu("Kehadiran")}
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
                  onClick={() => pindahMenu("Break")}
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
                  onClick={() => pindahMenu("Sholat")}
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
                  onClick={() => pindahMenu("Istirahat")}
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
                    onFocus={() => handleInputFocus("kode_pegawai")}
                    textIconGroup={<i className="fa fa-user"></i>}
                    onChange={(e: TypeInputOnChangeValue) => {
                      const value = e.target.value;
                      setInput((prevInput) => ({
                        ...prevInput,
                        kode_pegawai: value,
                      }));
                      if (activeInput === "kode_pegawai") {
                        keyboardRef.current.setInput(value);
                      }
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
                    value={input.pin}
                    id="pin"
                    nouperCase
                    placeholder="Masukan PIN"
                    component={ReanderField}
                    right
                    inputGroup
                    onChange={(e: TypeInputOnChangeValue) => {
                      const value = e.target.value;
                      setInput((prevInput) => ({
                        ...prevInput,
                        pin: value,
                      }));
                      if (activeInput === "pin") {
                        keyboardRef.current.setInput(value);
                      }
                    }}
                    onFocus={() => handleInputFocus("pin")}
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
                  <KeyboardWrapper
                    onChange={handleChange}
                    onKeyPress={cekPin}
                    keyboardRef={keyboardRef}
                  />
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
