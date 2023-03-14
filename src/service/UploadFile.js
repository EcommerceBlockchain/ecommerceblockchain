import { Buffer } from "buffer";

import { create } from "ipfs-http-client";
const projectId = "2Mxb5jFftAWrMX2YcOmPmLRlnYB";
const projectSecret = "e1e5506e84e556a3a843fe2fe41a6a7e";

const UploadFile = async (file) => {
  let path = "";
  const auth =
    "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
  const client = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
      authorization: auth,
    },
  });
  let ans = await client.add(file);
  return ans.path;
};

export default UploadFile;
