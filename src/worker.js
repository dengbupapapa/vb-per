import * as idbKeyval from "idb-keyval";
import {
  traverseGeometriesVertexData2ArrayBuffer,
  traverseGeometriesVertexData2SharedArrayBuffer,
} from "./bufferTransform.js";
const db = "vb-per-db";
const table = "vb-per-table";
let store = idbKeyval.createStore(db, table);
export async function get(id) {
  let data = await idbKeyval.get(id, store);
  traverseGeometriesVertexData2SharedArrayBuffer(data);
  return data;
}
export function set(id, data) {
  traverseGeometriesVertexData2ArrayBuffer(data);
  return idbKeyval.set(id, data, store);
}
export function keys() {
  return idbKeyval.keys(store);
}
