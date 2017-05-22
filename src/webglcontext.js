
var context = undefined;

export function setContext(webglContext) {
  context = webglContext;
}

export function getContext() {
  return context;
}