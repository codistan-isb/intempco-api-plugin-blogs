export default async function listBlogPosts(parent, args, context, info){
    let getBlogPostResp = await context.queries.listBlogPosts(context, args);
    return getBlogPostResp
    }