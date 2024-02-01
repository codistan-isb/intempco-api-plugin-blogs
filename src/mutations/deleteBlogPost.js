import { decodeProductOpaqueId } from "../xforms/id.js";
import ReactionError from "@reactioncommerce/reaction-error";

export default async function deleteBlogPost(context, args) {
  let { _id } = args;
  const { collections } = context;
  const { Blogs } = collections;
  let decodedId = decodeProductOpaqueId(_id);
  const currentBlog = await Blogs.findOne({ _id: decodedId });
  if (!currentBlog) throw new ReactionError("not-found", "Blog not found");
  let filter = {
    isVisible: false,
    updatedAt: new Date(),
  };
//   console.log("filter", filter);
  //   filter.updatedAt= new Date();
  let modifier = { $set: filter };
  const { value: updatedBlog } = await Blogs.findOneAndUpdate(
    {
      _id: decodedId,
    },
    modifier,
    {
      returnOriginal: false,
    }
  );
  console.log("updateBlog", updatedBlog);
  if (updatedBlog) {
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
