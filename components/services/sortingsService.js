import { useAPI, useAPIMutation } from "../../utils/appClient";

const sortingsService = {
  useGetSortings: () => {
    return useAPI("/sortings");
  },

  useCreateSorting: () => {
    return useAPIMutation("/sortings");
  },

  useGetSortingByName: (name) => {
    return useAPI(`/sortings/${name}`);
  },
};

export default sortingsService;
