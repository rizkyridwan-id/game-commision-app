import { openDB, DBSchema } from "idb";
// Definisikan struktur skema basis data
interface MyDB extends DBSchema {
  // Tentukan versi skema
  root: {
    key: string;
    value: any;
  };
}

// Fungsi untuk membuka koneksi ke basis data
async function openDatabase() {
  return await openDB<MyDB>("persist", 1, {
    upgrade(db) {
      // Buat toko objek jika belum ada
      if (!db.objectStoreNames.contains("root")) {
        db.createObjectStore("root");
      }
    },
  });
}

// Fungsi untuk menambahkan data ke basis data
async function addToDatabase(key: string, value: any) {
  const db = await openDatabase();
  const tx = db.transaction("root", "readwrite");
  const store = tx.store;
  await store.put(value, key);
  await tx.done;
  //   await refreshDatabase();
  await getFromDatabase(key);
}

// Fungsi untuk mendapatkan data dari basis data berdasarkan kunci
async function getFromDatabase(key: string) {
  const db = await openDatabase();
  const tx = db.transaction("root", "readonly");
  const store = tx.store;
  return await store.get(key);
}

// Fungsi untuk menghapus data dari basis data berdasarkan kunci
async function deleteFromDatabase(key: string) {
  const db = await openDatabase();
  const tx = db.transaction("root", "readwrite");
  const store = tx.store;
  await store.delete(key);
  await tx.done;
}

const indexedDBStorage = {
  async getItem(key: string) {
    const item = await getFromDatabase(key);
    return item ? JSON.parse(item) : null;
  },

  async setItem(key: string, item: any) {
    await addToDatabase(key, JSON.stringify(item));
  },

  async removeItem(key: string) {
    await deleteFromDatabase(key);
  },
};

export default indexedDBStorage;
