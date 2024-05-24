import { Menu } from "@/config";
import { DataUserInterFace } from "@/interface";
import {
  AppDispatch,
  AppThunk,
  helperActions,
  utilityActions,
} from "@/reduxStore";
import { NotifError, NotifInfo, postData, setItem, urlApi } from "@/utils";

export const reduxLogin = (): AppThunk => {
  return async (dispatch: AppDispatch, getState) => {
    try {
      const state = getState();
      const formValues = state.form?.loginForm?.values as DataUserInterFace;

      const response = await postData<DataUserInterFace>(
        urlApi.login,
        formValues
      );

      setItem("userdata", response.data);

      if (response.data.level !== "SU" && response.data.level !== "OWNER") {
        await getHakAkses(response.data);
      } else {
        setItem("hakAkses", Menu);
      }

      setTimeout(() => {
        dispatch(utilityActions.stopLoading());
        dispatch(helperActions.isLogin(true));
      }, 1000);
    } catch (error) {
      NotifInfo(`${error}`);
      dispatch(utilityActions.stopLoading());
    }
  };
};

/**
 * Fungsi untuk mendapatkan hak akses berdasarkan data pengguna.
 * @param {DataUserInterFace} datauser - Data pengguna yang digunakan untuk mendapatkan hak akses.
 * @returns {Promise<boolean>} - Promise yang menandakan berhasil atau tidaknya mendapatkan hak akses.
 */
export const getHakAkses = (data: DataUserInterFace): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    if (JSON.parse(data.hak_akses_json || "[]").length > 0) {
      const menu: any[] = [];

      JSON.parse(data.hak_akses_json || "[]").forEach((row: any) => {
        if (row.is_show) {
          if (!row.children) {
            const hasil1 = {
              icon: row.icon,
              is_show: row.is_show,
              path: row.path,
              title: row.title,
              user_id: data.user_id,
            };
            menu.push(hasil1);
          } else {
            const menuChildern = row.children?.map((list: any) => {
              const children = Array.isArray(list.children)
                ? list.children.filter((child: any) => child.is_show)
                : undefined;
              return {
                ...list,
                children,
              };
            });

            const hasil = {
              ...row,
              children: menuChildern?.filter((child: any) => child.is_show),
            };
            menu.push(hasil);
          }
        }
      });

      const filterMenu = menu.map((akses: any) => {
        if (!akses.children?.length) {
          delete akses.children;
        }
        const children = akses.children?.map((child: any) => {
          if (!child.children?.length) {
            delete child.children;
          }
          return child;
        });
        return { ...akses, children };
      });

      // Simpan hak akses ke dalam penyimpanan lokal
      setItem("hakAkses", filterMenu);

      // Selesaikan promise dengan nilai true (berhasil mendapatkan hak akses)
      resolve(true);
    } else {
      // Tangani kesalahan
      NotifError("Hak Akses Belum Di Setting");

      // Selesaikan promise dengan nilai false (gagal mendapatkan hak akses)
      reject(false);
    }
  });
};
