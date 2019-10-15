var api = {
  NODE_ENV: '"Uat development"',
  ENV_TAG: 'Uat development',
  BASEURL: 'https://ts.itxcc.com/api',
  // BASEURL: 'https://www.deltablue.cn',
}
module.exports = {
  //接口列表开始
  getUserToken:`${api.BASEURL}/user/getUserToken`,
  getClassify:`${api.BASEURL}/classify/getClassify`,
  getCurrentArticle:`${api.BASEURL}/article/getCurrentArticle`,
  getArticle:`${api.BASEURL}/article/getArticle`
}