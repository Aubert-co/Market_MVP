import { ErrorMessage } from "./ErrorMessage";

type RetryParams<T, B> = {
  retries: number;
  func: (body: T) => Promise<FuncReturn<B>>;
  body: T;
};

export type FuncReturn<B> = {
  success: boolean;
  data?: B; 
};

export async function retry<T, B>({
  retries,
  func,
  body
}: RetryParams<T, B>): Promise<FuncReturn<B>> {

  let lastError: unknown;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const value = await func(body);

      if (value.success) {
        return value; 
      }

      throw new Error("Operation failed");

    } catch (err) {
      lastError = err;

      if (attempt < retries) {
        await new Promise(res => setTimeout(res, 100 * attempt));
      }
    }
  }
  return {success:false}
}