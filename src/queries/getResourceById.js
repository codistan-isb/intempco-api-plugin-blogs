import { decodeProductOpaqueId } from "../xforms/id.js";

export default async function getResourceById(context, args) {
//   console.log("args in get blogs ", args);
  let { _id } = args;
  const { collections } = context;
  const { Services } = collections;
  let decodedId = decodeProductOpaqueId(_id);
//   console.log("decodedId",decodedId);
  let getResourceByIdResponse = await Services.findOne({
    _id: decodedId,
    isVisible: true,
  });
//   console.log("blogPostResponse:- ", getResourceByIdResponse);
  if (getResourceByIdResponse) {
    return getResourceByIdResponse;
  } else {
    return null;
  }
}
