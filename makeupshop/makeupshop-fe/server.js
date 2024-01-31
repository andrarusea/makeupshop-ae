const express = require('express');
const app = express();

app.use(express.static('public')); // Folder containing your static files

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
