import bcrypt from 'bcryptjs';

export class Password {
  static async Hash(password: string) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    return await hashedPassword;
  }

  static async Compare(suppliedPassword: string, storepassword: string) {
    return await bcrypt.compare(suppliedPassword, storepassword);
  }
}
