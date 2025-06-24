import { useAPI, useAPIMutation } from "../../utils/appClient";

const sortingsService = {
  useGetSortings: () => {
    return useAPI("/sortings");
  },

  useCreateSorting: () => {
    return useAPIMutation("/sortings");
  },
};

export default sortingsService;
