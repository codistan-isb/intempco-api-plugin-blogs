import { decodeProductOpaqueId } from "../xforms/id.js";
import ReactionError from "@reactioncommerce/reaction-error";

export default async function updateResource(context, args) {
  let { _id, input } = args;
  const { collections } = context;
  const { Services } = collections;
  let decodedId = decodeProductOpaqueId(_id);
  console.log("decodedId", decodedId);
  const currentServie = await Services.findOne({ _id: decodedId });
  if (!currentServie)
    throw new ReactionError("not-found", "Resource not found");
  console.log("currentServie", currentServie);
  input.updatedAt = new Date();
  let modifier = { $set: input };
  const  { value: updatedResource } = await Services.findOneAndUpdate(
    {
      _id: decodedId,
    },
    modifier,
    {
      returnOriginal: false,
    }
  );
  // console.log("updatedResource",updatedResource);
    if (updatedResource) {
      return {
        status: true,
        message: "Record Updated Sucessfully",
        data: updatedResource,
      };
    } else {
      return {
        status: false,
        message: "Something went wrong",
        data: null,
      };
    }
}
