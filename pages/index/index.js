//index.js
//获取应用实例
const app = getApp()
import * as Api from '../../apis/index.js';
let util = require('../../utils/util.js');

let cache = {}
let page_cache = {
  all: 1, // 全部
  good: 1, // 精华
  share: 1, // 分享
  ask: 1, // 问答
  job: 1 // 招聘
}
let isRefreshing = false // 是否在刷新
let isDone = false // 是否在加载

const TAB_MAP = ['all', 'good', 'share', 'ask', 'job']

/**
 * 获取列表数据
 */
const fetchList = (tab = '', pageNo = 1) => {
  return Api.getTopics(tab, pageNo).then((res) => {
    console.log("获取数据", tab, res.data)
    return res.data.data
  }).then(list => {
    let tmp_list = list.map((item) => {
      item.create_at = util.formatTime(new Date(item.create_at))
      return item;
    })
    return tmp_list
  })
}

Page({
  data: {
    default_list: [],
    good: [],
    share: [],
    ask: [],
    job: [],
    tab: 0
  },
  onLoad: function () {
    fetchList().then(res => {
      this.setData({
        default_list: res
      })
    })
  },
  bindUpper: function (e) { // 下拉刷新
    console.log("upper", e)
    console.log(this.data.tab)
    if (isRefreshing) return
    isRefreshing = true
    let tabType = TAB_MAP[this.data.tab]
    page_cache[tabType] = 1
    // 获取列表
    fetchList(tabType).then(res => {
      isRefreshing = false
      switch (this.data.tab) {
        case 0:
          this.setData({
            default_list: res
          })
          break;
        case 1:
          this.setData({
            good: res
          })
          break;
        case 2:
          this.setData({
            share: res
          })
          break;
        case 3:
          this.setData({
            ask: res
          })
          break;
        case 4:
          this.setData({
            job: res
          })
          break;
      }
    }).catch(err => {
      console.log("获取列表错误", err)
      isRefreshing = false
    })
  },
  bindLower: function (e) { // 上拉加载
    console.log("上拉加载",this.data.tab)
    if (isRefreshing) return
    isRefreshing = true
    let tabType = TAB_MAP[this.data.tab]
    page_cache[tabType] = page_cache[tabType] + 1
    // 获取列表
    fetchList(tabType, page_cache[tabType]).then(res => {
      if (res.length == 0) {
        page_cache[tabType] = page_cache[tabType] - 1
      } else {
        let tmpList
        switch (this.data.tab) {
          case 0:
            tmpList = []
            tmpList = this.data.default_list.concat(res)
            this.setData({
              default_list: tmpList
            })
            break;
          case 1:
            tmpList = []
            tmpList = this.data.good.concat(res)
            this.setData({
              good: tmpList
            })
            break;
          case 2:
            tmpList = []
            tmpList = this.data.share.concat(res)
            this.setData({
              share: tmpList
            })
            break;
          case 3:
            tmpList = []
            tmpList = this.data.ask.concat(res)
            this.setData({
              ask: tmpList
            })
            break;
          case 4:
            tmpList = []
            tmpList = this.data.job.concat(res)
            this.setData({
              job: tmpList
            })
            break;
        }
      }
      isRefreshing = false
    }).catch(err => {
      page_cache[tabType] = page_cache[tabType] - 1
      console.log("获取列表错误", err)
      isRefreshing = false
    })
  },
  bindChangePage: function (e) {
    // 切换tab
    this.changeNav(e.detail.current)
  },
  changeNav: function (tabIndex) {
    let navBarTitle = '全部'
    let tab = ''
    this.setData({
      tab: tabIndex
    })
    switch (tabIndex) {
      case 0:
        navBarTitle = '全部'
        break;
      case 1:
        navBarTitle = '精华'
        this.changeNavPageData('good', (res) => {
          this.setData({
            good: res
          })
        })
        break;
      case 2:
        navBarTitle = '分享'
        this.changeNavPageData('share', (res) => {
          this.setData({
            share: res
          })
        })
        break;
      case 3:
        navBarTitle = '问答'
        this.changeNavPageData('ask', (res) => {
          this.setData({
            ask: res
          })
        })
        break;
      case 4:
        navBarTitle = '招聘'
        this.changeNavPageData('job', (res) => {
          this.setData({
            job: res
          })
        })
        break;
    }
    wx.setNavigationBarTitle({
      title: navBarTitle,
    })
  },
  changeNavPageData: function (tab, cb) {
    if (!cache[tab]) {
      fetchList(tab, 1).then(res => {
        cache[tab] = res
        cb(res)
      })
    } else {
      cb(cache[tab])
    }
  }
})
