import { decodeProductOpaqueId } from "../xforms/id.js";

export default async function getAllResources(context, args) {
  //   console.log("args in get blogs ", args);
  let { itemPerPage, PageNumber, searchQuery } = args;
  const { collections } = context;
  const { Services } = collections;
  let filters = { isVisible: true };
  if (searchQuery) {
    filters.$or = [
      { title: { $regex: searchQuery, $options: "i" } },
      { description: { $regex: searchQuery, $options: "i" } },
    ];
  }
//   console.log("filters", filters);
  let itemsPerPage = itemPerPage ? itemPerPage : 10; // Number of items to display per page
  PageNumber = PageNumber ? PageNumber : 1;
  let skipAmount = (PageNumber - 1) * itemsPerPage;
  let totalCount = await Services.countDocuments(filters);
  let ServicesResponse = await Services.find(filters)
    .skip(skipAmount)
    .limit(itemsPerPage)
    .toArray();
//   console.log("ServicesResponse:- ", ServicesResponse);
  if (ServicesResponse) {
    return {
      totalCount,
      data: ServicesResponse,
    };
  } else {
    return null;
  }
}
