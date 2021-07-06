const router = require('express').Router();
const {
  initTable,
  assignTable,
  switchTable,
} = require('../controllers/controller');

router.get('/', (req: any, res: any) => res.send('Hello World!'));
router.get('/initTable', initTable);
router.post('/assignTable', assignTable);
router.post('/switchTable', switchTable);

module.exports = router;

export {}