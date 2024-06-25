import { Field, reduxForm, useEffect } from "@/package";
import { NotaInterFace } from "@/interface";
import { ModalGlobal } from "@/components";
import {
  dragElement,
  duplicate,
  hapusLabel,
  pilihNota,
  removeData,
  setData,
  simpanNota,
} from "./redux";
import { useDispatch } from "react-redux";
import {
  AppDispatch,
  themesActions,
  useAppSelector,
  utilityActions,
  // utilityController,
} from "@/reduxStore";
import {
  HiddenField,
  NumberOnly,
  ReanderField,
  RenderSelect,
  getItem,
  removeItem,
} from "@/utils";
import { change } from "redux-form";
import ModalTambahLabel from "./form";

const SettingMember = () => {
  const dispatch = useDispatch<AppDispatch>();
  const componenet = getItem<NotaInterFace[]>("list_component");

  //   const { handleSubmit } = props;
  useEffect(() => {
    dispatch(themesActions.handleSetPageSidebar(false));
    dispatch(themesActions.handleSetPageHeader(false));
    document.body.style.overflowX = "hidden";
    document.body.style.overflowY = "auto";
    dispatch(utilityActions.setDataNota({ data: componenet }));

    // const filed = getItem<string>("filed");
    const font = getItem<string>("font");

    const fieldNota = document.getElementById("filed_nota");
    if (fieldNota) {
      // fieldNota.innerHTML = `<h5> ${
      //   filed == null ? "NOTA" : "NOTA " + filed + ` DESKTOP `
      // } </h5>`;

      const filter = "KARTU_MEMBER";
      dispatch(pilihNota(filter));
      dispatch(change("SettingMember", "pilihnota", filter));
      dispatch(change("SettingMember", "style_font", font == null ? "" : font));
      removeItem("list_component");
    }

    return () => {
      dispatch(themesActions.handleSetPageHeader(true));
      dispatch(themesActions.handleSetPageSidebar(true));
      document.body.style.overflowX = "";
      document.body.style.overflowY = "";
    };
  }, [dispatch]);

  const disabled = useAppSelector((state) => state.utility.getModal.isEdit);
  // const nota = [
  //   {
  //     value: "KARTU_MEMBER",
  //     label: "KARTU MEMBER",
  //   },
  //   {
  //     value: "AMBIL_SISA",
  //     label: "AMBIL SISA",
  //   },
  // ];

  const datanota: any = useAppSelector((state) => state.utility.getNota);

  // const helperRedux = utilityController();

  const cariData = (e: string) => {
    const regex = new RegExp(`${e}`, "i");
    if (e === "") {
      dispatch(
        utilityActions.setDataNota<NotaInterFace[]>({ data: componenet })
      );
    } else {
      const result = componenet.filter(
        (list) => regex.test(list.name) || regex.test(list.value)
      );
      dispatch(utilityActions.setDataNota<NotaInterFace[]>({ data: result }));
    }
  };

  const utility = useAppSelector((state) => state.utility);

  return (
    <div className="row">
      <div className="col-7">
        <div className="container-nota">
          {componenet.map((list, index) => {
            return (
              list.is_show && (
                <div
                  style={{
                    width: list.width,
                    height: list.height,
                    position: "absolute",
                    backgroundColor: "red",
                    cursor: "grab",
                    left: list.position_x + "px",
                    top: list.position_y + "px",
                    transform: `rotate(${list.rotate}deg)`,
                    fontSize: "10px",
                  }}
                  key={index}
                  id={`${list.name}`}
                  className="kotakNota"
                  onDoubleClick={() => dispatch(removeData(`${list.name}`))}
                  onClick={() =>
                    dispatch(
                      dragElement(
                        document.getElementById(`${list.name}`),
                        `${list.name}`
                      )
                    )
                  }
                >
                  {list.name}
                </div>
              )
            );
          })}
        </div>
      </div>
      <div className="col-4">
        <div className="text-center" id="filed_nota">
          {" "}
          Nota{" "}
        </div>
        <div className="row mt-4">
          {/* <div className="col-lg-6">
            <Field
              id="pilihnota"
              name="pilihnota"
              label="Pilih Setting"
              placeholder="PILIH Setting"
              options={nota}
              onChange={(e: any) => dispatch(pilihNota(e))}
              component={RenderSelect}
            />
          </div> */}

          <div className="col-lg-12">
            <Field
              name="cari"
              label="Cari Nota"
              noUpperCase
              placeholder="Cari Field"
              onChange={(e: any) => cariData(e.target.value)}
              component={ReanderField}
            />
          </div>
        </div>
        <div className="mt-3">
          <ul
            className="list-group"
            id="list_component"
            style={{ overflow: "scroll", height: "200px" }}
          >
            {datanota.data.map((list: NotaInterFace, index: number) => {
              return (
                <li className="list-group-item" key={index}>
                  <div className="row">
                    <div className="col-9">
                      <button
                        disabled={disabled}
                        onClick={() => dispatch(setData(list.name))}
                        className="btn btn-default btn-sm text-nowrap"
                      >
                        {" "}
                        {list?.value?.slice(0, 20)} ({list.name}){" "}
                      </button>
                    </div>
                    <div className="col-3 text-end">
                      <button
                        disabled={disabled}
                        className="btn btn-default btn-sm"
                        onClick={() =>
                          dispatch(
                            duplicate(list.name, list.value, list?.jenis)
                          )
                        }
                      >
                        <i className="fa fa-copy fa-lg"> </i>
                      </button>
                      &nbsp;
                      <button
                        disabled={disabled}
                        onClick={() => dispatch(hapusLabel(list.name))}
                        className={`btn btn-default btn-sm ${
                          list.is_deletable ? "" : "d-none"
                        }`}
                      >
                        <i className="fa fa-trash fa-lg"> </i>
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        {datanota.data.length !== 0 && (
          <div className="row mt-3">
            <div className="col-lg-4">
              <Field
                id="nama_text"
                name="name"
                label="Nama Text"
                readOnly
                noUpperCase
                placeholder="Nama Text"
                component={ReanderField}
              />
            </div>
            <div className="col-lg-4">
              <Field
                id="font_style"
                name="font_style"
                label="Font Style"
                noUpperCase
                placeholder="Font Style"
                options={[
                  {
                    value: "normal",
                    label: "Normal",
                  },
                  {
                    value: "bold",
                    label: "Bold",
                  },
                ]}
                component={RenderSelect}
              />
            </div>
            <Field
              id="url_image"
              name="url_image"
              type="hidden"
              component={HiddenField}
            />
            <div className="col-lg-4">
              <Field
                id="jenis"
                name="jenis"
                label="Jenis"
                placeholder="Jenis"
                noUpperCase
                options={[
                  {
                    value: "text",
                    label: "Text",
                  },
                  {
                    value: "line",
                    label: "Line",
                  },
                  {
                    value: "gambar",
                    label: "Gambarr",
                  },
                  {
                    value: "barcode",
                    label: "Barcode",
                  },
                  {
                    value: "qrcode",
                    label: "Qr Code",
                  },
                ]}
                disabled={disabled}
                component={RenderSelect}
              />
            </div>
            <div className="col-lg-4">
              <Field
                id="isi_field_value"
                name="value"
                label="Isi"
                noUpperCase
                placeholder="Isi"
                readOnly={disabled}
                component={ReanderField}
              />
            </div>
            <div className="col-lg-4">
              <Field
                id="width"
                name="width"
                label="Width"
                normalize={NumberOnly}
                placeholder="Width"
                readOnly={disabled}
                isNumber
                component={ReanderField}
              />
            </div>
            <div className="col-lg-4">
              <Field
                id="rotate"
                name="rotate"
                label="Rotate"
                placeholder="Rotate"
                readOnly={disabled}
                component={ReanderField}
              />
            </div>
            <div className="col-lg-4">
              <Field
                id="height"
                name="height"
                label="Height"
                isNumber
                normalize={NumberOnly}
                placeholder="Height"
                readOnly={disabled}
                component={ReanderField}
              />
            </div>
            <div className="col-lg-4 ">
              <Field
                id="font_size"
                name="font_size"
                nouperCase
                isNumber
                label="Font Size"
                normalize={NumberOnly}
                placeholder="Font Size"
                readOnly={disabled}
                component={ReanderField}
              />
            </div>

            {/* <div className="col-lg-4 mt-4">
              <button
                id="tambahLabel"
                className="btn btn-primary btn-block"
                data-toggle="modal"
                data-target="#exampleModal"
                name="simpan"
                disabled={disabled}
                onClick={() =>
                  dispatch(
                    helperRedux.showModal({
                      namaForm: "TambahLabel",
                      isEdit: false,
                      title: "Tambah Label",
                    })
                  )
                }
              >
                Tambah Label
              </button>
            </div> */}
            <div className="col-lg-4 mt-4">
              <button
                id="simpan"
                name="simpan"
                disabled={disabled}
                onClick={() => dispatch(simpanNota())}
                className="btn btn-success btn-block"
              >
                {utility.getLoading.screen ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin mr-4"></i>
                    &nbsp;
                  </>
                ) : (
                  ""
                )}
                Simpan Data
              </button>
            </div>
          </div>
        )}
        {/* </PerfectScrollbar> */}
      </div>

      <ModalGlobal namaForm="Tambah Label" title="Tambah Label">
        <ModalTambahLabel />
      </ModalGlobal>
    </div>
  );
};

export default reduxForm<NotaInterFace>({
  form: "SettingMember",
})(SettingMember);
