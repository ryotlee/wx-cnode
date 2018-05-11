import _ from '../utils/wx.promisify.js';

/**
 * 获取主题列表
 * page Number 页数
 * tab String 主题分类。目前有 ask share job good
 * limit Number 每一页的主题数量
 * mdrender String 当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本
 */
export function getTopics(tab = '', page = 1, limit = 10, mdrender = true) {
  return _.$get('/topics', {
    page: page,
    tab: tab,
    limit: limit,
    mdrender: mdrender
  })
}

/**
 * 获取文章详情
 */
export function getTopicDetail(id) {
  return _.$get('/topic/' + id)
}

/**
 * 获取用户信息
 */
export function getUserInfo(loginname) {
  return _.$get('/user/' + loginname)
}