import { PegawaiInterface } from "@/interface";
import { SocketData } from "@/interface";
import { AppDispatch, useAppSelector, utilityActions } from "@/reduxStore";
import { VITE_APP_BE, timeout } from "@/utils";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";

const ModalFingerPrnit = () => {
  const dataPegawai = useAppSelector((state) => state.utility)?.getModal
    ?.data as PegawaiInterface;

  const [statusFingerPrint, setstatusFingerPrint] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (dataPegawai.kode_toko && dataPegawai.kode_pegawai) {
      const socket = io((VITE_APP_BE as string).replace("/api/v1", ""));
      socket.connect();
      socket.on("connect", () => {
        socket.emit(
          "join-room",
          `${dataPegawai.kode_toko}~${dataPegawai.kode_pegawai}`
        );
        socket.on("fingerprint-register", async (data: SocketData) => {
          if (data.is_valid) {
            setstatusFingerPrint(true);
            await timeout(1000);
            dispatch(utilityActions.hideModal());
          } else {
            setstatusFingerPrint(false);
          }
        });
      });
      return () => {
        socket.disconnect();
      };
    }
  }, [dataPegawai]);

  return (
    <div>
      <div className="text-center" style={{ marginTop: 100, marginBottom: 50 }}>
        <i
          className={`fa-solid fa-fingerprint fa-lg ${
            !statusFingerPrint ? "fa-bounce" : ""
          }`}
          style={{
            fontSize: "10em",
            color: `${statusFingerPrint ? "#218838" : "#000000"}`,
          }}
        ></i>
        <br />
        <br />
        <br />
        {statusFingerPrint
          ? "Fingerprint Berhasil Di Scan"
          : "Silahkan Scan Fingerprint"}
      </div>
    </div>
  );
};

export default ModalFingerPrnit;
