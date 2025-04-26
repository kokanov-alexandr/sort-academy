import { useAPI, useAPIMutation } from "../utils/appClient";

const testsService = {
  useGetTests: () => {
    return useAPI("/tests");
  },

  useGetTestById: (id) => {
    return useAPI(`/tests/${id}`);
  },

  useCreateTest: () => {
    return useAPIMutation("/tests");
  },
};

export default testsService;
