import { Buffer } from "buffer";

const GetFileByPath = (path) => {
  let API = "https://olive-improved-felidae-649.mypinata.cloud/ipfs/";
  console.log("path", path);

  return API + path;
};

export default GetFileByPath;
