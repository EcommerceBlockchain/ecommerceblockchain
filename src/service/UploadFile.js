import { Buffer } from "buffer";

import { create } from "ipfs-http-client";
import { PinataSDK } from "pinata";

const UploadFile = async (file) => {
  const pinata = new PinataSDK({
    pinataJwt: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkZjQyZTg5ZC0yZmFiLTQxYjgtOTIzNi1kNDA4YjUwYzg3YjQiLCJlbWFpbCI6Inlhc2htaXN0cnkxMjFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6Ijk4NDMwZGFlMmVjOGI4MmVkZTNlIiwic2NvcGVkS2V5U2VjcmV0IjoiNTQ2NzRmYTliZDA0ZjZiNWNiMjgwOTk5ZDBlODg4ZjBhZmIzYmM5MzYyN2FiYWYyZmRkNzM0MDY5ODdjNWMxMiIsImV4cCI6MTc3MzY2ODcwMH0.70_4ySTq9kHbu9u64pbMjKVJDwOo8IarXvnWulGYxvM`,
    pinataGateway: `https://olive-improved-felidae-649.mypinata.cloud`,
  });

  try {
    const upload = await pinata.upload.public.file(file);
    return upload.cid;
  } catch (error) {
    console.log(error);
  }
};

export default UploadFile;
