import { useAPI, useAPIMutation } from "../utils/appClient";

const questionResultService = {
  useCreateQuestionResult: () => {
    return useAPIMutation("/questions/results");
  },
};

export default questionResultService;
