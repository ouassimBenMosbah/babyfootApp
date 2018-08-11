import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  console.log('===== match!!======');
  res.json({ matchs: null });
});

module.exports = router;
