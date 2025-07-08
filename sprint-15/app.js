const mysql = require("pg");
const CONFIG = require("./config");

async function connectDataBase() {
  const client = new mysql.Client(CONFIG);
  try {
    await client.connect();
    console.log("✅ Підключення до бази даних успішне!");

    const query = 'SELECT * FROM public."order_items"';
    const result = await client.query(query);
    console.log(result.rows);
  } catch (error) {
    console.error("❌ Помилка підключення або виконання запиту:", error);
  } finally {
    // Завершуємо підключення незалежно від результату
    await client.end();
    console.log("🔌 Підключення до бази даних закрито.");
  }
}

connectDataBase();