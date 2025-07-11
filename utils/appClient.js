import useSWR from "swr";
import useSWRMutation from "swr/mutation";

const API_BASE_URL = "https://localhost:7022";

const fetcher = async (url) => {
  const res = await fetch(`${API_BASE_URL}${url}`);
  if (!res.ok) {
    const error = new Error(`HTTP error! Status: ${res.status}`);
    error.info = await res.json();
    throw error;
  }
  return await res.json();
};

export const useAPI = (url) => {
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useAPIMutation = (url) => {
  const { data, error, trigger, isMutating } = useSWRMutation(
    url,
    async (key, { arg }) => {
      const res = await fetch(`${API_BASE_URL}${key}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(arg),
      });

      if (!res.ok) {
        const error = new Error(`HTTP error! Status: ${res.status}`);
        const text = await res.json();
        error.status = res.status;
        error.detail = text.detail;
        throw error;
      }

      const text = await res.text();
      return text ? JSON.parse(text) : null;
    }
  );

  return {
    data,
    error,
    trigger,
    isMutating,
  };
};
