import { Request, Response, NextFunction } from "express";
import { object, string, number } from "yup";

const productDataValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productData = req.body;
    const productSchema = object({
      title: string().required(),
      price: number().min(0.1).required(),
      category: string().required(),
      description: string().required(),
      image: string().required(),
      rating: object({
        rate: number().required(),
        count: number().required(),
      }),
    });
    await productSchema.validate(productData);
    next();
  } catch (error) {
    next(error);
  }
};

const productUpdateValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const paramsData = parseInt(req.params.id);
    const productData = req.body;

    const paramsSchema = number().min(0).required();

    const productSchema = object({
      title: string().required(),
      price: number().min(0.1).required(),
      category: string().required(),
      description: string().required(),
      image: string().required(),
      rating: object({
        rate: number().min(0).required(),
        count: number().min(0).required(),
      }),
    });

    await productSchema.validate(productData);
    await paramsSchema.validate(paramsData);

    next();
  } catch (error) {
    next(error);
  }
};

const idParamsValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const paramsData = parseInt(req.params.id);
    const paramsSchema = number().min(1).required();
    await paramsSchema.validate(paramsData);
    next();
  } catch (error) {
    next(error);
  }
};

const categoryDataValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoryData = req.body;
    const categorySchema = object({
      name: string().required(),
    });

    await categorySchema.validate(categoryData);
    next();
  } catch (error) {
    next(error);
  }
};

const categoryUpdateValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const paramsData = req.params.name;

  const categoryData = req.body;

  const categorySchema = string().required();

  const paramsSchema = object({
    name: string().required(),
  });

  await categorySchema.validate(categoryData);

  await paramsSchema.validate(paramsData);

  next();
};

const nameParamsValidatator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const paramsData = req.params.name;

    const paramsSchema = string().required();

    await paramsSchema.validate(paramsData);

    next();
  } catch (error) {
    next(error);
  }
};

export default {
  productDataValidator,
  productUpdateValidator,
  idParamsValidator,
  categoryDataValidator,
  categoryUpdateValidator,
  nameParamsValidatator,
};
