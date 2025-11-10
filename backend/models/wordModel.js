import { db } from "../config/db.js";

export const getAllWords = async () => {
  const [rows] = await db.query("SELECT * FROM words");
  return rows;
};

export const addWord = async (spanish, english) => {
  const [result] = await db.query(
    "INSERT INTO words (spanish, english) VALUES (?, ?)",
    [spanish, english]
  );
  return { id: result.insertId, spanish, english };
};

export const updateWord = async (id, spanish, english) => {
  await db.query("UPDATE words SET spanish=?, english=? WHERE id=?", [
    spanish,
    english,
    id,
  ]);
};

export const deleteWord = async (id) => {
  await db.query("DELETE FROM words WHERE id=?", [id]);
};
