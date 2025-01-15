import axios from 'axios';
const isMobileDevice = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const visitStats = {
    platform:window.navigator.platform,
    device:isMobileDevice() ? '移动端':'PC端',
    browser:'',
    screen:window.screen.width + ' * ' +  window.screen.height,
   }

const userAgent = window.navigator.userAgent;
if (userAgent.indexOf("Chrome") !== -1) {
    visitStats.browser = "Google Chrome";
} else if (userAgent.indexOf("Safari") !== -1) {
    visitStats.browser = "Apple Safari";
} else if (userAgent.indexOf("Firefox") !== -1) {
    visitStats.browser = "Mozilla Firefox";
} else if ((userAgent.indexOf("MSIE") !== -1) || (!!document.documentMode === true)) {
    visitStats.browser = "Internet Explorer";
} else if (userAgent.indexOf("Edge") !== -1) {
    visitStats.browser = "Microsoft Edge";
} else if (userAgent.indexOf("Opera") !== -1 || userAgent.indexOf("OPR") !== -1) {
    visitStats.browser = "Opera";
} else {
    visitStats.browser = "Unknown";
}

const visitors = async() => {
      await axios.post('/visitors',visitStats);
}

export default visitors