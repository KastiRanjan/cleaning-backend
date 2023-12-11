export type ErrorResponse = {
  errorType: ErrorType;
  errorMessage: string;
  errors: string | null;
  errorRaw: any;
  errorsValidation: ErrorValidation[] | null;
  stack?: string;
  success: boolean;
  status: number;
};

export type ErrorType = 'General' | 'Raw' | 'Validation' | 'Unauthorized';

export type ErrorValidation = { [key: string]: string };
