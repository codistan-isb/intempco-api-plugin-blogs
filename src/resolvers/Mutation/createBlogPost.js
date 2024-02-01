import ReactionError from "@reactioncommerce/reaction-error";
export default async function createBlogPost(parent, { input }, context, info) {
  let { userId } = context;
  if (!userId) {
    throw new ReactionError("access-denied", "Please login first");
  }
  let createBlogPostResp = await context.mutations.createBlogPost(
    context,
    input
  );
  return createBlogPostResp;
}
