const app = require('./app');
const connectDB = require('./config/database');

// Database connection
connectDB();

// Start the Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`\n${'━'.repeat(21)} 🔥 SERVER ${'━'.repeat(21)}`);
  console.log(`🟢 STATUS      → Running`);
  console.log(`🔗 LINK        → http://localhost:${PORT}`);
  console.log(`🌍 ENVIRONMENT → ${process.env.NODE_ENV}`);
  console.log(`⏰ STARTED AT  → ${new Date().toLocaleTimeString()}\n`);
});
