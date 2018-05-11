// pages/detail/detail.js
var WxParse = require('../../wxParse/wxParse.js');
import * as Api from '../../apis/index.js';

let windowHeight = 1000

Page({

  /**
   * 页面的初始数据
   */
  data: {
    topic: {}, // 文章
    article_content: '',
    animationData: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let sysInfo = wx.getSystemInfoSync();
    windowHeight = sysInfo.windowHeight
    console.log(sysInfo.windowHeight)
    // 设置标题
    wx.setNavigationBarTitle({
      title: options.title,
    })
    /**
     * 获取详情
     */
    Api.getTopicDetail(options.id).then(res=>{
      console.log("获取详情", res)
      return res.data.data
    }).then(res=>{
      this.setData({
        topic: res,
        article_content: WxParse.wxParse('article_content', 'html', res.content, this, 5)
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 创建动画
    var animation = wx.createAnimation({
      duration: 350,
      timingFunction: 'ease',
    })
    this.animation = animation
  },
  bindShowModal: function() { // 显示评论弹窗
    console.log("show", this.animation)
    this.animation.translateY(0).step()
    this.setData({
      animationData: this.animation.export()
    })
  },

  bindHideModal: function() { // 隐藏评论弹窗
    console.log("hide", this.animation)
    this.animation.translateY(windowHeight).step()
    this.setData({
      animationData: this.animation.export()
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})