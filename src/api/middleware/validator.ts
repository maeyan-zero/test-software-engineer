import { ZodError, ZodIssue, ZodTypeAny } from "zod";
import { StatusCodes } from "http-status-codes";
import { Middleware } from "@/api/middleware/types";

type ErrorDetail = {
  path: string;
  message: string;
};

export function validate(schema: ZodTypeAny): Middleware {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        // translate errors to api specification
        res.status(StatusCodes.BAD_REQUEST).json({
          error: "Invalid Event",
          details: parseZodError(err as ZodError),
        });
      } else {
        // send to your favourite devops stack
        console.error(err);

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          error: "Internal Server Error",
        });
      }
    }
  };
}

function parseZodError(err: ZodError): ErrorDetail[] {
  return err.errors.map((issue: ZodIssue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));
}
