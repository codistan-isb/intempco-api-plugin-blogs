import ReactionError from "@reactioncommerce/reaction-error";
export default async function deleteBlogPost(parent, args, context, info) {
  let { userId } = context;
  if (!userId) {
    throw new ReactionError("access-denied", "Please login first");
  }
  let createBlogPostResp = await context.mutations.deleteBlogPost(
    context,
    args
  );
  return createBlogPostResp;
}
