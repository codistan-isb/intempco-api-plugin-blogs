import ReactionError from "@reactioncommerce/reaction-error";
export default async function updateResource(parent, args, context, info) {
  let { userId } = context;
  if (!userId) {
    throw new ReactionError("access-denied", "Please login first");
  }
  let updateResourceResp = await context.mutations.updateResource(
    context,
    args
  );
  return updateResourceResp;
}
