import { fileURLToPath } from "url";
import { dirname } from "path";
import bycript from "bcrypt"

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

const getHashedPassword = password => {
    const salt = bycript.genSaltSync(10)
    return bycript.hashSync(password, salt)
}

const comparePassword = (password, passwordHashed) => {
    return bycript.compareSync(password, passwordHashed)
}

export { getHashedPassword, comparePassword }




