import { useAPIMutation } from "../utils/appClient";

const usersService = {
  useCreateUser: () => {
    return useAPIMutation("/users");
  },
};

export default usersService;



