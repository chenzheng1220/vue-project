
import { onMounted } from 'vue'
import axios from 'axios'

// 分享配置参数
const shareConfig = {
  title: '自定义分享标题',   // 标题
  desc: '分享描述文案，建议不超过50字',  // 描述
  link: window.location.href.split('#'), // 当前页面URL（需去掉hash部分）
  imgUrl: 'https://your-domain.com/logo.png' // 分享图标（300x300，需HTTPS）
}

// 初始化微信配置
const initWechatShare = async () => {
  try {
    // 1. 获取签名 (需后端接口)
    const { data } = await axios.get('/api/wechat-signature', {
      params: { url: shareConfig.link }
    })

    // 2. 配置SDK
    wx.config({
      debug: false, // 调试模式（生产环境关闭）
      appId: data.appId,
      timestamp: data.timestamp,
      nonceStr: data.nonceStr,
      signature: data.signature,
      jsApiList: [
        'updateAppMessageShareData', // 朋友分享
        'updateTimelineShareData'    // 朋友圈分享
      ]
    })

    // 3. 就绪后设置分享
    wx.ready(() => {
      // 朋友分享
      wx.updateAppMessageShareData({
        title: shareConfig.title,
        desc: shareConfig.desc,
        link: shareConfig.link,
        imgUrl: shareConfig.imgUrl,
        success: () => console.log('朋友分享配置成功')
      })

      // 朋友圈分享
      wx.updateTimelineShareData({
        title: shareConfig.title, // 朋友圈只读标题
        link: shareConfig.link,
        imgUrl: shareConfig.imgUrl,
        success: () => console.log('朋友圈分享配置成功')
      })
    })

    // 4. 错误处理
    wx.error(res => {
      console.error('微信SDK配置失败:', res)
      alert('分享功能暂不可用，请刷新重试')
    })

  } catch (error) {
    console.error('获取签名失败:', error)
  }
}

onMounted(() => {
  initWechatShare()
})

