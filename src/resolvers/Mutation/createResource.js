import ReactionError from "@reactioncommerce/reaction-error";
export default async function createResource(parent, { input }, context, info) {
  let { userId } = context;
  if (!userId) {
    throw new ReactionError("access-denied", "Please login first");
  }
  let createResourcePostResp = await context.mutations.createResource(
    context,
    input
  );
  return createResourcePostResp;
}
