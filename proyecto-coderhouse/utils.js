import fs from "fs";
const fileExist = async (path) => {
  try {
    if (fs.existsSync(path)) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
  }
};

const readFile = async (file) => {
  try {
    let result = await fs.promises.readFile(file, "utf-8");
    let data = await JSON.parse(result);
    return data;
  } catch (err) {
    return false;
  }
};

const writeFile = async (file, data) => {
 
  try {
    await fs.promises.writeFile(file, JSON.stringify(data));
    return true;
  } catch (err) {
    console.log(err);
  }
};

const deleteFile = async (file) => {
  try {
    await fs.promises.unlink(file);
    return true;
  } catch (err) {
    console.log(err);
  }
};

export default { readFile, writeFile, deleteFile };
