export interface Cat {
  url: string;
}

export interface ReceiveJsonMessage {
  method: string;
}

export interface ReceiveInitMessage extends ReceiveJsonMessage {
  method: "init";
  data: Cat[];
}

export interface ReceiveAppendMessage extends ReceiveJsonMessage {
  method: "append";
  data: Cat;
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isTypeOfObject(obj: any): obj is Record<string, any> {
  return typeof obj === "object" && obj !== null;
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isTypeOfReceiveJsonMessage(obj: any): obj is ReceiveJsonMessage {

  if (!isTypeOfObject(obj)) {
    console.error("Invalid ReceiveJsonMessage", obj);
    return false;
  }

  const valid = typeof obj === "object" && obj !== null && typeof obj.method === "string";
  if (!valid) {
    console.error("Invalid ReceiveJsonMessage", obj);
  }

  return valid;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isTypeOfReceiveInitMessage(obj: any): obj is ReceiveInitMessage {
  if (!isTypeOfObject(obj)) {
    return false;
  }

  const valid = obj.method === "init" && typeof obj.data === "object" && Array.isArray(obj.data);
  if (!valid) {
    console.error("Invalid ReceiveInitMessage", obj);
  }

  return valid;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isTypeOfReceiveAppendMessage(obj: any): obj is ReceiveAppendMessage {
  if (!isTypeOfObject(obj)) {
    return false;
  }

  const valid = obj.method === "append" && typeof obj.data === "object" && typeof obj.data.url === "string";
  if (!valid) {
    console.error("Invalid ReceiveAppendMessage", obj);
  }

  return valid;
}
