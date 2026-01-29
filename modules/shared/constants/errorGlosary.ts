export const ERROR_GLOSSARY: Record<string, { title: string; message: string }> = {
  USER_NOT_FOUND: {
    title: "User Not Found",
    message: "The specified user does not exist. Please check the user email and try again.",
  },
  INVALID_PASSWORD: {
    title: "Invalid Password",
    message: "The password you entered is incorrect. Please try again.",
  },
  EMAIL_ALREADY_IN_USE: {
    title: "Email Already In Use",
    message: "The email address you provided is already associated with another account.",
  },
};
