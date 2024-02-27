export default async function getAllResources(parent, args, context, info){
    let geResourcesResp = await context.queries.getAllResources(context, args);
    return geResourcesResp
    }