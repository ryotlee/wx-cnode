// pages/profile/profile.js
import * as Api from '../../apis/index.js';
let util = require('../../utils/util.js');

Page({
  previewAvatar: function(e) {
    wx.previewImage({
      urls: [this.data.profile.avatar_url],
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    profile: {} // 用户信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    Api.getUserInfo(options.loginname).then(res => res.data.data).then(res=>{
      let tmp = res
      tmp.avatar_url = tmp.avatar_url.substring(0, tmp.avatar_url.lastIndexOf('?'));
      //格式化时间
      let tmp_replies = tmp.recent_replies
      tmp_replies = tmp_replies.map((item)=>{
        item.last_reply_at = util.formatTime(new Date(item.last_reply_at))
        return item;
      })
      tmp.recent_replies = tmp_replies

      let tmp_topics = tmp.recent_topics
      tmp_topics = tmp_topics.map((item)=>{
        item.last_reply_at = util.formatTime(new Date(item.last_reply_at))
        return item;
      })
      tmp.recent_topics = tmp_topics
      return tmp
    }).then(res=>{
      console.log("用户信息", res)
      this.setData({
        profile: res
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})