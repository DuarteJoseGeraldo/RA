import usersRepository from "../repository/usersRepository";
import { User } from "../repository/usersRepository";
import { makeError } from "../middlewares/errorHandler";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const registerUser = async (user: User): Promise<User> => {
  const userSalt = Number(process.env.SALT) ?? 10;

  const findUser = await usersRepository.selectUserByUserName(user.userName!);

  if (findUser) {
    throw makeError({
      message: "User name already registered",
      status: 400,
    });
  }

  const newUserData: User = {
    userName: user.userName,
    userPassword: await bcrypt.hash(user.userPassword!, userSalt),
  };

  const newUserId = await usersRepository.insertUser(newUserData);

  const newUser = await usersRepository.selectUserById(newUserId);

  return newUser;
};

const login = async (user: User) => {
  const findUser = await usersRepository.selectUserByUserName(user.userName!);

  if (!findUser) {
    throw makeError({
      message: "User not Found",
      status: 400,
    });
  }

  const verifyPassword = await bcrypt.compare(
    user.userPassword!,
    findUser.userPassword!
  );

  if (!verifyPassword) {
    throw makeError({
      message: "Wrong Password",
      status: 401,
    });
  }

  const mySecret = process.env.SECRET ?? "testeDeDesenvolvimento";

  const newToken = jwt.sign(findUser, mySecret, { expiresIn: "1d" });

  return newToken;
};

export default { registerUser, login };
