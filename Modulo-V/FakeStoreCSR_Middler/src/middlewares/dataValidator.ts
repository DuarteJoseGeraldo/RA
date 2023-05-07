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
      title: string().min(1).required(),
      price: number().min(0.1).required(),
      category: string().min(1).required(),
      description: string().min(1).required(),
      image: string().min(1).required(),
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
const productPathValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const paramsData = parseInt(req.params.id);
    const productData = req.body;

    const paramsSchema = number().min(0).required();

    const productSchema = object({
      title: string().min(1),
      price: number().min(0.1),
      category: string().min(1),
      description: string().min(1),
      image: string().min(1),
      rating: object({
        rate: number().min(0),
        count: number().min(0),
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
  try {
    const paramsData = req.params.name;

    const categoryData = req.body;

    const paramsSchema = string().required();

    const categorySchema = object({
      name: string().required(),
    });

    await categorySchema.validate(categoryData);

    await paramsSchema.validate(paramsData);

    next();
  } catch (error) {
    next(error);
  }
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

const userDataValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = req.body;

    const userSchema = object({
      userName: string().required(),
      userPassword: string().min(8).required(),
    });

    await userSchema.validate(userData);
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
  userDataValidator,
  productPathValidator,
};
