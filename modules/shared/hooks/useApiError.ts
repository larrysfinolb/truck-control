import axios from "axios";
import { useMemo } from "react";
import { ApiErrorResponse } from "../interfaces/apiErrorResponse";
import { ERROR_GLOSSARY } from "../constants/errorGlosary";

const DEFAULT_ERROR = {
  title: "An unexpected error occurred",
  message: "An unexpected error occurred. Please try again later.",
};

export const useApiError = (error: unknown) => {
  return useMemo(() => {
    if (!error) {
      return null;
    }

    if (axios.isAxiosError(error) && error.response?.data) {
      const apiError = error.response.data as ApiErrorResponse;
      const code = apiError.errorCode;

      const glossaryEntry = ERROR_GLOSSARY[code];

      if (glossaryEntry) {
        return glossaryEntry;
      }
    }

    return DEFAULT_ERROR;
  }, [error]);
};
