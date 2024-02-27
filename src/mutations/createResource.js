import Random from "@reactioncommerce/random";

export default async function createResource(context, args) {
  // console.log("args createBlogPost", args);
  const { collections } = context;
  const { Services } = collections;

  let { title, description, image } = args;
  const newServices = {
    _id: Random.id(),
    title,
    description,
    image,
    updatedAt: new Date(),
    createdAt: new Date(),
    isVisible: true,
    isDeleted: false
  };
  console.log("newServices :- ",newServices);
  let newServicesResponse = await Services.insertOne(newServices);
  // console.log("newBlogResponse",newBlogResponse);
  if (newServicesResponse?.ops.length > 0) {
    return newServicesResponse?.ops[0];
  }
}
