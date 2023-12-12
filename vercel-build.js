const { execSync } = require('child_process');

try {
  // Run Prisma commands during build
  execSync('npx prisma generate');
} catch (error) {
  console.error('Error running Prisma commands during build:', error);
  process.exit(1);
}