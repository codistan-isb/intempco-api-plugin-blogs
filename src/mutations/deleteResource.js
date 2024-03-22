import { decodeProductOpaqueId } from "../xforms/id.js";
import ReactionError from "@reactioncommerce/reaction-error";

export default async function deleteResource(context, args) {
  let { _id } = args;
  const { collections } = context;
  const { Services } = collections;
  let decodedId = decodeProductOpaqueId(_id);
  const currentResource = await Services.findOne({ _id: decodedId });
  if (!currentResource) throw new ReactionError("not-found", "Resource not found");
  let filter = {
    isVisible: false,
    updatedAt: new Date(),
  };
//   console.log("filter", filter);
  //   filter.updatedAt= new Date();
  let modifier = { $set: filter };
  const { value: updatedResource } = await Services.findOneAndUpdate(
    {
      _id: decodedId,
    },
    modifier,
    {
      returnOriginal: false,
    }
  );
  // console.log("updatedResource", updatedResource);
  if (updatedResource) {
    return{
        status:true,
        message:"Record deleted Sucessfully"
    }
  }else{
    return{
        status:false,
        message:"Something went wrong"
    }
  }
}
