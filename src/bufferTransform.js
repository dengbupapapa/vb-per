let hasSharedArrayBuffer = false;
try {
  new self.SharedArrayBuffer(1);
  hasSharedArrayBuffer = true;
} catch (e) {
  console.warn(e);
}
export function toSharedView(view) {
  if (hasSharedArrayBuffer) {
    let type = view.constructor.name;
    let TypedArray = self[type];
    let sharedBuff = new self.SharedArrayBuffer(
      view.length * TypedArray.BYTES_PER_ELEMENT
    );
    let sharedView = new TypedArray(sharedBuff);
    sharedView.set(view);
    return sharedView;
  } else {
    return view;
  }
}
export function toView(sharedView) {
  let type = sharedView.constructor.name;
  let TypedArray = self[type];
  let buff = new self.ArrayBuffer(
    sharedView.length * TypedArray.BYTES_PER_ELEMENT
  );
  let view = new TypedArray(buff);
  view.set(sharedView);
  return view;
}

export function traverseGeometriesVertexData2SharedArrayBuffer(data) {
  data.geometries.vertexData.forEach((property) => {
    Object.keys(property).forEach((key) => {
      let value = property[key];
      if (ArrayBuffer.isView(value)) {
        property[key] = toSharedView(value);
      }
    });
  });
}
export function traverseGeometriesVertexData2ArrayBuffer(data) {
  data.geometries.vertexData.forEach((property) => {
    Object.keys(property).forEach((key) => {
      let value = property[key];
      if (ArrayBuffer.isView(value)) {
        property[key] = toView(value);
      }
    });
  });
}
