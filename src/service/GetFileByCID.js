import { Buffer } from "buffer";

import { create } from "ipfs-http-client";
const projectId = "2Mxb5jFftAWrMX2YcOmPmLRlnYB";
const projectSecret = "e1e5506e84e556a3a843fe2fe41a6a7e";

const GetFileByCID = (file) => {
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
  client.add(file).then(async (res) => {
    console.log(res.path, "path");
  });
};

export default GetFileByCID;
