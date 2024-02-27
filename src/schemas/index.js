import importAsString from "@reactioncommerce/api-utils/importAsString.js";

const blogs = importAsString("./blogs.graphql");
const resources = importAsString("./resources.graphql");
export default [blogs,resources];
