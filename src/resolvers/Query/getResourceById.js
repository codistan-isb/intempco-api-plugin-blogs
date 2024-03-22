export default async function getResourceById(parent, args, context, info){
    let getResourceByIdResp = await context.queries.getResourceById(context, args);
    return getResourceByIdResp;
    }