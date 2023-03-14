import { Buffer } from "buffer";

const GetFileByPath = (path) => {
  let API = "https://digimart.infura-ipfs.io/ipfs/";

  return API + path;
};

export default GetFileByPath;
