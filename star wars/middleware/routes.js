function routesSetup(express ,app , config , calcObj) {
  var router = express.Router();
  router.use(function timeLog (req, res, next) {
    let dateLst = calcObj.currentTime();
    let dateStr = dateLst.slice(0,3).join('/');
    let timeStr = dateLst.slice(3).join(':')
    console.log('(Time log: ['+dateStr+' '+timeStr , ']) :- requested url : ' , req.url);
    next();
  });
  router.get('/',(req , res) => {
    res.render('login_page');
  });

  router.get('/search_planets' , (req, res) => {
    calcObj.authUser(req.session.userName , req.session.password , (err , resp) => {
      if(err){
        res.redirect('/');
      }else{
        res.render('search_planets');
      }
    });
  });
  router.get("/planetNames" , (req, res) => {
    calcObj.getPlanetsInfo((planetsInfo) =>{
      res.send(planetsInfo);
    })
  });
  router.get('/logout' , (req,res) =>{
    req.session.destroy(function(err) {
      res.redirect('/');
    })
  })
  router.post('/login_user',(req , res) => {
    let username = req.body["userName"] || "";
    let password = req.body["password"] || "";
    calcObj.authUser(username , password , (err , resp) => {
      if(err){
        res.status(401);
        res.send(JSON.stringify(resp));
      }else{
        req.session.userName = username;
        req.session.password = password;
        res.status(200);
        res.send(JSON.stringify(resp));
      }
    });
  });
  return router;
}
module.exports = routesSetup;
