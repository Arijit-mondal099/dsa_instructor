import app from "./app";
import { ENV } from "./config/env";
import { db_connection } from "./config/db";

app.listen(ENV.PORT, () => {
  db_connection()
    .then(() => console.log(`🚀 Server running on http://localhost:${ENV.PORT}`))
    .catch((err) => { throw new Error(err) })
});
