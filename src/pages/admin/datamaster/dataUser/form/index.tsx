import {
  AppDispatch,
  RootState,
  useAppSelector,
  utilityActions,
} from "@/reduxStore";
import {
  ButtonCustom,
  HiddenField,
  ReanderField,
  RenderSelect,
  setFocusField,
} from "@/utils";
import {
  Field,
  InjectedFormProps,
  reduxForm,
  connect,
  useDispatch,
  useEffect,
  useState,
} from "@/package";
import { ConfigProps } from "redux-form";
import { Skeleton } from "antd";
import { Menu } from "@/config";
import SortableTree, {
  changeNodeAtPath,
} from "@nosferatu500/react-sortable-tree";
import "@nosferatu500/react-sortable-tree/style.css";
import { DataUserInterFace, HakAksesInterFace } from "@/interface";
import { datauserController } from "../redux";
import { validateDataUser } from "../validate";
type FormProps = {
  isEdit: boolean;
  idUser?: string;
  hakAkses?: string;
};

const FormDataUser = (
  props: InjectedFormProps<DataUserInterFace, FormProps, string> & FormProps
) => {
  const { handleSubmit, isEdit, idUser, hakAkses } = props;
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setisLoading] = useState(false);
  const getNodeKey = ({ treeIndex }: any) => treeIndex;
  const proses = datauserController();
  const utility = useAppSelector((state) => state.utility);

  const simpan = async (data: DataUserInterFace) => {
    const hakaskses = utility.getDataTmp.data as HakAksesInterFace[];
    dispatch(proses.prosesData(data, hakaskses));
  };

  useEffect(() => {
    getAksesMenu();
    if (isEdit) {
      setFocusField("user_name");
    } else {
      setFocusField("user_id");
    }
  }, [idUser, dispatch]);

  const getAksesMenu = async () => {
    if (hakAkses) {
      const dataakses = JSON.parse(hakAkses || "[]");
      const updatedMenuCabang = Menu.map((item) => {
        const matchingItem = dataakses.find(
          (menuItem: any) => menuItem.title === item.title
        );
        if (matchingItem && matchingItem.is_show !== undefined) {
          let updatedChildren: any = [];
          if (item.children) {
            updatedChildren = item.children.map((childItem) => {
              const matchingChildItem = matchingItem.children.find(
                (childMenuItem: any) => childMenuItem.title === childItem.title
              );
              if (
                matchingChildItem &&
                matchingChildItem.is_show !== undefined
              ) {
                return { ...childItem, is_show: matchingChildItem.is_show };
              }
              return childItem;
            });
          }

          if (item.children && item.children.length >= 3) {
            const thirdChild = item.children[2];
            if (matchingItem.children && matchingItem.children.length >= 3) {
              const matchingThirdChild = matchingItem.children[2];
              if (
                matchingThirdChild &&
                matchingThirdChild.is_show !== undefined
              ) {
                thirdChild.is_show = matchingThirdChild.is_show;
              }
            }
          }

          return {
            ...item,
            is_show: matchingItem.is_show,
            children: updatedChildren,
          };
        }
        return item;
      });
      // setTreeData(updatedMenuCabang);
      dispatch(
        utilityActions.simpanDataTmp({
          data: updatedMenuCabang,
        })
      );
      setisLoading(false);
    } else {
      dispatch(
        utilityActions.simpanDataTmp({
          data: Menu,
        })
      );
      // setTreeData(menu);
      setisLoading(false);
    }
  };

  const [isShowPassword, setIsShowPassword] = useState(true);

  const treeData: any = utility.getDataTmp?.data;

  return (
    <form onSubmit={handleSubmit(simpan)}>
      <Field name="_id" type="hidden" component={HiddenField} />
      <div className="row">
        <div
          className={utility.getScreenSize === "lg" ? "col-5" : "col-12"}
          style={{
            maxWidth: utility.getScreenSize === "lg" ? "34.666667%" : "100%",
          }}
        >
          <div style={{ height: 400 }}>
            {isLoading ? (
              <>
                <Skeleton active />
                <Skeleton active />
                <Skeleton active />
              </>
            ) : (
              <SortableTree
                treeData={treeData}
                onChange={(treeData) =>
                  dispatch(
                    utilityActions.simpanDataTmp({
                      data: treeData,
                    })
                  )
                }
                generateNodeProps={({ node, path }) => ({
                  title: (
                    <div>
                      <div className="input-group">
                        <input
                          type="text"
                          // readOnly="readOnly"
                          className="form-control"
                          value={node.title}
                          onChange={(event) => {
                            const title = event.target.value;
                            dispatch(
                              utilityActions.simpanDataTmp({
                                data: changeNodeAtPath({
                                  treeData,
                                  path,
                                  getNodeKey,
                                  newNode: { ...node, title },
                                }),
                              })
                            );
                          }}
                          placeholder="Recipient's username"
                        />
                        <div className="input-group-append">
                          {node.is_show ? (
                            <>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  const is_show = false;
                                  dispatch(
                                    utilityActions.simpanDataTmp({
                                      data: changeNodeAtPath({
                                        treeData,
                                        path,
                                        getNodeKey,
                                        newNode: { ...node, is_show },
                                      }),
                                    })
                                  );
                                }}
                                className="btn btn-primary"
                              >
                                {" "}
                                <i className="fa fa-eye"></i>{" "}
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  const is_show = true;
                                  dispatch(
                                    utilityActions.simpanDataTmp({
                                      data: changeNodeAtPath({
                                        treeData,
                                        path,
                                        getNodeKey,
                                        newNode: { ...node, is_show },
                                      }),
                                    })
                                  );
                                }}
                                className="btn btn-secondary"
                              >
                                {" "}
                                <i className="fa fa-eye-slash"></i>{" "}
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ),
                })}
              />
            )}
          </div>
        </div>
        <div
          className={utility.getScreenSize === "lg" ? "col-7" : "col-12 mt-4"}
        >
          <div className="row">
            <div className={"col-6"}>
              <div className="mb-20px">
                <Field
                  label="User Id"
                  id="user_id"
                  name="user_id"
                  type="text"
                  noUpperCase
                  readOnly={isEdit}
                  placeholder="Masukan User Id"
                  component={ReanderField}
                />
              </div>
            </div>
            <div className={"col-6"}>
              <div className="mb-20px">
                <Field
                  label="Username"
                  id="user_name"
                  name="user_name"
                  type="text"
                  placeholder="Masukan Username"
                  component={ReanderField}
                />
              </div>
            </div>
            {!isEdit && (
              <div className={`col-6 `}>
                <div className="mb-20px">
                  <Field
                    type={"text"}
                    label="Passsword"
                    name="password"
                    enableenter
                    noUpperCase
                    id="password"
                    nouperCase
                    placeholder="Masukan Password"
                    component={ReanderField}
                    right
                    inputGroup
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
              </div>
            )}
            <div className={"col-6"}>
              <div className="mb-20px">
                <Field
                  label="Level"
                  name="level"
                  type="text"
                  placeholder="Pilih Level"
                  component={RenderSelect}
                  options={[
                    {
                      value: "SPV",
                      label: "SPV",
                    },
                    {
                      value: "ADMIN",
                      label: "ADMIN",
                    },
                    {
                      value: "OWN",
                      label: "OWNER",
                    },
                  ]}
                />
              </div>
            </div>

            <div className={`col-6 text-end ${isEdit ? "mt-2" : ""}`}>
              {isEdit && <> &nbsp;</>}
              <ButtonCustom
                color="primary"
                block
                type="submit"
                className="btn-xl"
              >
                {isEdit ? "Edit" : "Simpan "}
              </ButtonCustom>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

const mapState = (state: RootState<DataUserInterFace>) => {
  if (state?.utility?.getModal?.isEdit === true) {
    return {
      isEdit: state?.utility?.getModal?.isEdit,
      hakAkses: state?.utility?.getModal?.data?.hak_akses_json,
      initialValues: {
        _id: state?.utility?.getModal?.data?._id,
        user_id: state?.utility?.getModal?.data?.user_id,
        user_name: state?.utility?.getModal?.data?.user_name,
        level: state?.utility?.getModal?.data?.level,
      },
    };
  } else {
    return {
      hakAkses: "",
      isEdit: false,
    };
  }
};

const connector = connect(mapState);
const config: ConfigProps<DataUserInterFace, FormProps> = {
  form: "FormDataUser",
  enableReinitialize: true,
  validate: validateDataUser,
};

export default connector(
  reduxForm<DataUserInterFace, FormProps>(config)(FormDataUser)
);
