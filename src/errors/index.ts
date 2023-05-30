import { ErrorReturn } from "interfaces/ErrorReturn";

export function conflictError(message: string): ErrorReturn {
  return {
    name: "ConflictError",
    message,
  };
}

export function duplicatedEmailError(): ErrorReturn {
  return {
    name: "DuplicatedEmailError",
    message: "There is already an user with given email",
  };
}

export function unauthorizedError(): ErrorReturn {
  return {
    name: "UnauthorizedError",
    message: "You must be signed in to continue",
  };
}

export function notFoundError(): ErrorReturn {
  return {
    name: "NotFoundError",
    message: "No result for this search!",
  };
}

export function invalidCredentialsError(): ErrorReturn {
  return {
    name: "InvalidCredentialsError",
    message: "email or password are incorrect",
  };
}
