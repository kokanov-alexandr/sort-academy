import { useAPI, useAPIMutation } from "../../utils/appClient";

const testResultService = {
  useGetTestResultById: (id) => {
    return useAPI(`/tests/results?id=${id}`);
  },

  useCreateTestResult: () => {
    return useAPIMutation("/tests/results");
  },

  useCreateQuestionResult: () => {
    return useAPIMutation("/tests/results/answer");
  },
};

export default testResultService;
