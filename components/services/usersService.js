import { useAPIMutation } from "../../utils/appClient";

const usersService = {
  useCreateUser: () => {
    return useAPIMutation("/users");
  },

  useCConfirmEmail: () => {
    return useAPIMutation("/users/confirm-email");
  },

  useAuthorization: () => {
    return useAPIMutation("/users/login");
  },
};

export default usersService;
