import Random from "@reactioncommerce/random";

export default async function createBlogPost(context, args) {
  // console.log("args createBlogPost", args);
  const { collections } = context;
  const { Blogs } = collections;

  let {
    title,
    content,
    author,
    authorId,
    optionTitle,
    slug,
    description,
    datePublished,
    dateUpdated,
    metadata,
    status,
    featuredImage,
    isVisible,
    isDeleted,
    metafields
  } = args;
  const newBlog = {
    _id: Random.id(),
    title,
    content,
    author,
    authorId,
    optionTitle,
    slug,
    description,
    datePublished,
    dateUpdated,
    metadata,
    status,
    featuredImage,
    isVisible,
    isDeleted,
    metafields,
    updatedAt: new Date(),
    createdAt: new Date()
  };
  console.log("newBlog",newBlog);
  let newBlogResponse = await Blogs.insertOne(newBlog);
  console.log("newBlogResponse",newBlogResponse);
  if (newBlogResponse?.ops.length > 0) {
    return newBlogResponse?.ops[0];
  }
}
