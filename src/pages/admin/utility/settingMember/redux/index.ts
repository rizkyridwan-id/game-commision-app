import { NotaInterFace } from "@/interface";
import { AppDispatch, AppThunk, utilityActions } from "@/reduxStore";
import {
  NotifError,
  NotifInfo,
  NotifSuccess,
  convertBase64,
  deleteData,
  getData,
  getItem,
  postData,
  setItem,
  showConfirmation,
} from "@/utils";
import { change } from "redux-form";
import { FormTambahLabelDto } from "../dto";

export const dragElement = (elmnt: any, index: any): AppThunk => {
  return async (dispatch) => {
    // window.addEventListener("keyup", keyUp);

    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

    dispatch(setData(index));

    if (document.getElementById(elmnt.id + "header")) {
      const header = document.getElementById(elmnt.id + "header");
      if (header) {
        header.onmousedown = dragMouseDown;
      }
      /* if present, the header is where you move the DIV from:*/
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      elmnt.onmousedown = dragMouseDown;
    }

    document.onkeydown = handleKeyDown;

    function dragMouseDown(e: any) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
    function elementDrag(e: any) {
      e = e || window.event;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
      elmnt.style.backgroundColor = "red";

      const name = elmnt.getAttribute("id");
      const data3: any[] = getItem("list_component");
      const hasil = data3.findIndex((list) => list.name === name);
      data3[hasil].position_y = elmnt.offsetTop - pos2;
      data3[hasil].position_x = elmnt.offsetLeft - pos1;
      setItem("list_component", data3);
    }

    function handleKeyDown(e: any) {
      // Get the current position of the element
      const currentTop = elmnt.offsetTop;
      const currentLeft = elmnt.offsetLeft;

      // Set the amount by which the element will move with each arrow key press
      const moveAmount = 1; // You can adjust this value as needed

      if (e.key === "ArrowUp") {
        // Move the element up
        elmnt.style.top = currentTop - moveAmount + "px";
      } else if (e.key === "ArrowDown") {
        // Move the element down
        elmnt.style.top = currentTop + moveAmount + "px";
      } else if (e.key === "ArrowLeft") {
        // Move the element to the left
        elmnt.style.left = currentLeft - moveAmount + "px";
      } else if (e.key === "ArrowRight") {
        // Move the element to the right
        elmnt.style.left = currentLeft + moveAmount + "px";
      }

      // Update the position in local storage
      const name = elmnt.getAttribute("id");
      const data3: any[] = getItem("list_component");
      const hasil = data3.findIndex((list) => list.name === name);
      data3[hasil].position_y = elmnt.offsetTop;
      data3[hasil].position_x = elmnt.offsetLeft;
      setItem("list_component", data3);
    }

    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  };
};

export const pilihNota = (data: any): AppThunk => {
  return async (dispatch) => {
    dispatch(utilityActions.setLoading({ screen: true }));
    try {
      const result = await getData<NotaInterFace[]>(`member-card`);

      //   console.log(result.data)
      setItem("list_component", []);
      if (result.data) {
        setItem("list_component", result.data);
        setItem("filed", data);
        // console.log(result.data[0].font_family)
        dispatch(change("SettingMember", "style_font", ""));
        dispatch(
          change(
            "SettingMember",
            "style_font",
            result.data[0]?.font_family || null
          )
        );

        const filedNota = document.getElementById("filed_nota");
        if (filedNota) {
          filedNota.innerHTML = `<h5>NOTA ${data.replaceAll(
            "_",
            " "
          )} DESKTOP </h5>`;
        }

        dispatch(utilityActions.stopLoading());
        dispatch(
          utilityActions.setDataNota<NotaInterFace[]>({
            data: result.data,
          })
        );
        dispatch(change("SettingMember", "cari", ""));
        dispatch(
          utilityActions.showModal({
            isModalShow: false,
            isEdit: false,
            data: data || [],
            namaForm: "",
            title: "",
          })
        );
        setItem("info", "BOLEHSETTING");
      }
    } catch (error) {
      if (error === 422) {
        dispatch(
          utilityActions.showModal({
            isModalShow: false,
            isEdit: true,
            data: data || [],
            namaForm: "",
            title: "",
          })
        );
        setItem("info", "SEDANGDISETTING");
      }
      NotifInfo(`${error}`);
      dispatch(utilityActions.stopLoading());
    }
  };
};

export const getValue = (event: any): AppThunk => {
  return async (dispatch) => {
    const file = event.target.files[0];
    // console.log(file);
    if (file !== undefined) {
      const base64 = await convertBase64(file);
      // console.log(base64);
      dispatch(change("SettingMember", "url_image", base64));
      const labelFile = document.getElementById("label-file");
      if (labelFile) {
        labelFile.innerHTML = file.name;
      }
    }
  };
};

export const setData = (name: string): AppThunk => {
  return async (dispatch: AppDispatch) => {
    const field: string = getItem("filed") || "HUTANG";
    const data: NotaInterFace[] = getItem("list_component");
    const result = data.map((element) => {
      if (name === element.name) {
        console.log(element);
        const row = {
          ...element,
          height: Number(element.height),
          isi: element.value,
          jenis: element.jenis,
          name: element.name,
          position_x: Number(element.position_x),
          position_y: Number(element.position_y),
          rotate: element.rotate,
          font_size: Number(element.font_size || 0),
          is_show: true,
          width: Number(element.width),
          type: field,
          is_deletable: element?.is_deletable || false,
        };

        dispatch(change("SettingMember", "name", element.name));
        dispatch(change("SettingMember", "width", element.width));
        dispatch(change("SettingMember", "rotate", element.rotate));
        dispatch(change("SettingMember", "font_size", element.font_size));
        dispatch(change("SettingMember", "height", element.height));
        dispatch(change("SettingMember", "jenis", element.jenis));
        dispatch(change("SettingMember", "value", element.value));
        dispatch(change("SettingMember", "font_style", element.font_style));
        element = row;
      }
      return element;
    });
    setItem("list_component", result);
    dispatch(utilityActions.setDataNota<NotaInterFace[]>({ data: result }));
  };

  // loadcontent();
};

export const removeData = (name: any): AppThunk => {
  return async (dispatch) => {
    const data: NotaInterFace[] = getItem<NotaInterFace[]>("list_component");
    const field = getItem("filed");
    await showConfirmation({
      title: "Anda Yakin Ingin Menghapus Data Ini",
      icon: "info",
    })
      .then(() => {
        const result = data.map((element) => {
          if (name === element.name) {
            return {
              ...element,
              is_show: false,
              type: field,
            };
          }
          return element;
        }) as NotaInterFace[];
        setItem("list_component", result);
        dispatch(utilityActions.setDataNota({ data: result }));
        dispatch(change("SettingMember", "name", ""));
        dispatch(change("SettingMember", "width", ""));
        dispatch(change("SettingMember", "rotate", ""));
        dispatch(change("SettingMember", "font_size", ""));
        dispatch(change("SettingMember", "height", ""));
        dispatch(change("SettingMember", "jenis_text", ""));
        dispatch(change("SettingMember", "value", ""));
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
};

export const simpanLabel = (): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const data = getState().form.ModalTambahLabel
        ?.values as FormTambahLabelDto;
      dispatch(utilityActions.setLoading({ screen: true }));
      const hasil = {
        name: data?.label.toLowerCase().includes("label")
          ? data?.label
          : data?.label + "_label",
        value: data?.value || "",
        type: getItem("filed"),
        jenis: "text",
        position_y: 350,
        position_x: 350,
        is_show: true,
        width: 100,
        height: 25,
        rotate: 0,
        font_size: 10,
      };
      const result = await postData("nota", hasil);
      if (result.data) {
        dispatch(utilityActions.hideModal());
        NotifSuccess("Label Berhasil Di Tambahkan");
        dispatch(pilihNota(getItem("filed")));
        dispatch(setData(hasil.name));

        setTimeout(() => {
          dispatch(utilityActions.stopLoading());
        }, 300);
      }
    } catch (error) {
      // console.log(error);
      dispatch(utilityActions.stopLoading());
      NotifSuccess(`${error}`);
    }
  };
};
export const simpanNota = (): AppThunk => {
  // console.log(name)
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const formValue = state.form.SettingMember?.values as NotaInterFace;

      const data = getItem<NotaInterFace[]>("list_component");

      if (formValue.jenis === undefined) {
        NotifError("Nota label belum dipilih");
        return false;
      }
      dispatch(utilityActions.setLoading({ screen: true }));

      const result = data.map((element) => {
        if (formValue.name === element.name) {
          return {
            ...element,
            isi: element?.isi || "",
            position_y: Number(element?.position_y || 350),
            position_x: Number(element?.position_x || 350),
            value: formValue?.value,
            height: Number(formValue?.height),
            font_style: formValue.font_style,
            jenis: formValue.jenis,
            font_size: Number(formValue?.font_size || 0),
            rotate: Number(formValue?.rotate),
            width: Number(formValue.width),
            is_show: true,
            type: getItem("filed"),
          };
        }
        return {
          ...element,
          is_show: element.is_show || false,
          isi: element?.isi || "",
          rotate: element?.rotate || 0,
          font_family:
            formValue?.font_family?.length === 0
              ? "times_new_roman"
              : formValue?.font_family || "-",
        };
      });
      const row = {
        font:
          formValue?.font_family?.length === 0
            ? "times_new_roman"
            : formValue?.font_family,
        type: getItem("filed"),
        detail_nota: result,
      };

      await postData("member-card", row);
      NotifSuccess("Nota Berhasil Disimpan");
      dispatch(pilihNota(getItem("filed")));
      dispatch(utilityActions.stopLoading());
    } catch (error) {
      NotifInfo(`${error}`);
      dispatch(utilityActions.stopLoading());
    }
  };
};
export const hapusLabel = (name: string): AppThunk => {
  return async (dispatch) => {
    try {
      const data = {
        name: name,
        type: String(getItem("filed")),
      };
      await deleteData("nota", data);
      NotifSuccess("Label berhasil di hapus");
      dispatch(pilihNota(getItem("filed")));
    } catch (error) {
      dispatch(pilihNota(getItem("filed")));
      NotifInfo(`${error}`);
    }
  };
};
export const duplicate = (
  name: string,
  value: string,
  jenis: string
): AppThunk => {
  return async (dispatch) => {
    try {
      const hasil = {
        name: String(name || "") + "_copy",
        value: String(value || 0) + "_copy",
        jenis: jenis,
        type: getItem("filed"),
        position_y: 350,
        position_x: 350,
        is_show: true,
        width: 100,
        height: 25,
        rotate: 0,
        font_size: 10,
      };
      const result = await postData("nota", hasil);
      if (result.data) {
        NotifSuccess("Data Berhasil Di Copy");
        dispatch(pilihNota(getItem("filed")));
      }
    } catch (error) {
      dispatch(pilihNota(getItem("filed")));
      NotifInfo(`${error}`);
    }
  };
};
