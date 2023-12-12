const { execSync } = require('child_process');

try {
  // Run Prisma commands during build
  execSync('npm i');
  execSync('npx prisma generate');
  execSync('npx prisma migrate reset');
  execSync('npm run dev');
} catch (error) {
  console.error('Error running Prisma commands during build:', error);
  process.exit(1);
}