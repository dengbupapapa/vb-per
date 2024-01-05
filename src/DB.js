import Worker from "workerize-loader?inline=true!./worker";
import {
  traverseGeometriesVertexData2SharedArrayBuffer,
  traverseGeometriesVertexData2ArrayBuffer,
} from "./bufferTransform.js";
let worker = Worker();
export default class MyDB {
  constructor() {}
  create(id, data) {
    traverseGeometriesVertexData2SharedArrayBuffer(data);
    return worker.set(id, data);
  }
  async find(id) {
    let data = await worker.get(id);
    traverseGeometriesVertexData2ArrayBuffer(data);
    return data;
  }
  keys() {
    return worker.keys();
  }
}
