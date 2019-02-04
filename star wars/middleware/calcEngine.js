var request = require('request');
var fs = require("fs");
var path = require("path");
class calcEngine {
  constructor(config) {
    this.basePath = '../dataStore/';
    this.peopleJson = {};
    this.planetsJson = {};
    this.config = config;
  }
  loadJedi(callback){
    let writePath = path.join(__dirname, this.basePath , 'jedis.json');
    request(this.config.peopleUrl , (err , resp , body) => {
      let peopleLst = JSON.parse(body || '{}')["results"] || [];
      this.peopleJson = {
        'jedis' : peopleLst
      };
      fs.writeFileSync(writePath , JSON.stringify(this.peopleJson));
      this.loadPlanets((ret) => {
        return callback("done");
      })
    })
  }
  authUser(userName , password , callback){
    for(let i = 0 ; i < (this.peopleJson["jedis"] || []).length ; i++){
      let eachJedi = this.peopleJson["jedis"][i];
      let user = eachJedi["name"] || false;
      let passwd = eachJedi["birth_year"] || false;
      console.log(user , userName , passwd , password);
      if(user == userName && passwd == password){
        return callback(false , {"status" : "Done"})
      }
    }
    return callback(true , {"status" : "Invalid"})
  }
  loadPlanets(callback){
    let writePath = path.join(__dirname, this.basePath , 'planets.json');
    request(this.config.planetsUrl , (err , resp , body) => {
      let planetsLst = JSON.parse(body || '{}')["results"] || [];
      this.planetsJson = {
        'planetsDetails' : planetsLst || []
      };
      fs.writeFileSync(writePath , JSON.stringify(this.planetsJson));
      return callback("done");
    });
  }
  getPlanetsInfo(callback){
    let planetLst = this.planetsJson["planetsDetails"] || [];
    return callback(planetLst);
  }
  currentTime(){
    let date = new Date();
    let day = date.getDay();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    return [day, month , year ,hour ,minutes , seconds];
  }
}
module.exports = calcEngine;
