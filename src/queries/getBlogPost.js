import { decodeProductOpaqueId } from "../xforms/id.js";

export default async function getBlogPost(context, args) {
  // console.log("args in get blogs ", args);
  let { _id } = args;
  const { collections } = context;
  const { Blogs } = collections;
  let decodedId = decodeProductOpaqueId(_id);
  let blogPostResponse = await Blogs.findOne({
    _id: decodedId,
    isVisible: true,
  });
  // console.log("blogPostResponse:- ", blogPostResponse);
  if (blogPostResponse) {
    return blogPostResponse;
  } else {
    return null;
  }
}
