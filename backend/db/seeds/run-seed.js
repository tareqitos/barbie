const seedDatabase = require('./seed');
const { exec } = require('child_process');

exec('node db/sync.js', (err, stdout, stderr) => {
  if (err) {
    console.error('Error syncing database:', err);
    process.exit(1);
  }

  console.log(stdout);
  console.error(stderr);

  seedDatabase().then(() => {
    console.log('Seeding completed successfully!');
    process.exit(0);
  }).catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  });
});



