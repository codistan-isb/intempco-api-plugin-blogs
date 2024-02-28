import ReactionError from "@reactioncommerce/reaction-error";
export default async function deleteResource(parent, args, context, info) {
  let { userId } = context;
  if (!userId) {
    throw new ReactionError("access-denied", "Please login first");
  }
  let deleteResourceResp = await context.mutations.deleteResource(
    context,
    args
  );
  return deleteResourceResp;
}
