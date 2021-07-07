//Initialize API routes

const router = require('express').Router();
const {
  initTable,
  assignTable,
  switchTable,
} = require('../controllers/controller');

router.get('/', (req: any, res: any) => res.send('YAAS IT IS WORKING!'));
router.get('/initTable', initTable);
router.post('/assignTable', assignTable);
router.post('/switchTable', switchTable);

module.exports = router;

export {}