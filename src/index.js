import { app } from "./app.js";
import { connectToDatabase } from "./database/mongo/database.config.mongoose.js";

const PORT = process.env.PORT || 8080

await connectToDatabase()

app.listen(PORT, ()=>{ console.log(`Server rodando en PUERTO ${PORT}`)})