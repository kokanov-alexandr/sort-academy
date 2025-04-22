import { useAPI, useAPIMutation } from "../utils/appClient";

const testsService = {
  useGetTests: () => {
    return useAPI("/tests");
  },

  useCreateTest: () => {
    return useAPIMutation("/tests");
  },
};

export default testsService;
