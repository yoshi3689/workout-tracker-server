import validate from "deep-email-validator";
import { OutputFormat } from "deep-email-validator/dist/output/output";

export const validateEmail = async (email: string) => {
  let res: OutputFormat;
  try {
    res = await validate({
    email: email,
    sender: email,
    validateRegex: true,
    validateMx: true,
    validateTypo: true,
    validateDisposable: true,
    validateSMTP: false,
  });
    console.log(res)
    if (!res.valid) throw new Error(res.reason);
  } catch (err) {
    throw err;
  }
}