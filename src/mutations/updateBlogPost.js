import { decodeProductOpaqueId } from "../xforms/id.js";
import ReactionError from "@reactioncommerce/reaction-error";

export default async function updateBlogPost(context, args) {
  let { _id, input } = args;
  const { collections } = context;
  const { Blogs } = collections;
  let decodedId = decodeProductOpaqueId(_id);
  const currentBlog = await Blogs.findOne({ _id: decodedId });
  if (!currentBlog) throw new ReactionError("not-found", "Blog not found");
  input.updatedAt = new Date();
  let modifier = { $set: input };
  const { value: updatedBlog } = await Blogs.findOneAndUpdate(
    {
      _id: decodedId,
    },
    modifier,
    {
      returnOriginal: false,
    }
  );
  if (updatedBlog) {
    return {
      status: true,
      message: "Record Updated Sucessfully",
      data: updatedBlog,
    };
  } else {
    return {
      status: false,
      message: "Something went wrong",
      data: null,
    };
  }
}
