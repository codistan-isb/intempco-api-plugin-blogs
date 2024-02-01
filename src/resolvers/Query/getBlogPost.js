export default async function getBlogPost(parent, args, context, info){
    let getBlogPostResp = await context.queries.getBlogPost(context, args);
    return getBlogPostResp
    }