export default async function listBlogPosts(context, args) {
  const { collections } = context;
  const { Blogs } = collections;
  let { itemPerPage, PageNumber, status, searchQuery } = args;
  let filters = { isVisible: true };
  if (status) {
    filters.status = new RegExp(`^${status}$`, "i");
  }
  if (searchQuery) {
    filters.$or = [
      { title: { $regex: searchQuery, $options: "i" } },
      { content: { $regex: searchQuery, $options: "i" } },
      { author: { $regex: searchQuery, $options: "i" } },
      { optionTitle: { $regex: searchQuery, $options: "i" } },
      { description: { $regex: searchQuery, $options: "i" } },
      { slug: { $regex: searchQuery, $options: "i" } },
    ];
  }
  // console.log("filters", filters);
  let itemsPerPage = itemPerPage ? itemPerPage : 10; // Number of items to display per page
  PageNumber = PageNumber ? PageNumber : 1;
  let skipAmount = (PageNumber - 1) * itemsPerPage;
  let totalCount = await Blogs.countDocuments(filters);
  let blogPostResponse = await Blogs.find(filters)
    .skip(skipAmount)
    .limit(itemsPerPage)
    .toArray();
  // console.log("blogPostResponse:- ", blogPostResponse);
  if (blogPostResponse) {
    return {
      totalCount,
      data: blogPostResponse,
    };
  } else {
    return { totalCount, data: null };
  }
}
