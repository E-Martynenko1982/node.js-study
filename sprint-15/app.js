const mysql = require("pg");

const CONFIG = require("./config");

async function connectDataBase() {
  const client = new mysql.Client(CONFIG);
  try {
    await client.connect();
    console.log("✅ Підключення до бази даних успішне!");

    const text = `INSERT INTO public."products" (product_id, product_name) VALUES ($1, $2)`;
    const values = [4, 'Product D'];
    const result = await client.query(text, values);
    console.log(result.rows)

    //result.rows.forEach(item => console.log(item.quantity))


  } catch (error) {
    console.error("❌ Помилка підключення або виконання запиту:", error);
  } finally {
    // Завершуємо підключення незалежно від результату
    await client.end();
    console.log("🔌 Підключення до бази даних закрито.");
  }
}

connectDataBase();