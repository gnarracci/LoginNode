const express = express();
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/signup', (req, res, next) => {

});

router.post('/signup', (req, res, next) => {
    
});

router.get('/signin', (req, res, next) => {
    
});

router.post('/signin', (req, res, next) => {
    
});

module.exports = router;