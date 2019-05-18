
<template>
    <div class="webApi">
        <p class="options">屏幕旋转角度:{{ angle }} 度</p>
        <p class="options">{{ batteryInfo }}</p>
        <p class="options" @click="vibrateFun">{{ vibrateInfo }}</p>
        <p class="options">当前网络状况 : {{ onLineInfo }}</p>
        <p class="options" @click="fullScreenFun">{{ fullScreenInfo }}</p>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                angle: 0,
                batteryInfo: 0,
                vibrateInfo: '点击震动',
                onLineInfo: 'online',
                fullScreenInfo: "打开全屏",
                infoNum: 1,
                timer: null
            }
        },
        mounted() {
            this.screenOrientation();
            this.getBatteryInfo();
            window.addEventListener('online', this.updateOnlineStatus, true);
            window.addEventListener('offline', this.updateOnlineStatus, true);
            window.addEventListener('blur', this.doFlashTitle, true);
            window.addEventListener('focus', _ => {
                clearInterval(this.timer);
                document.title = '微信网页版';
            }, true);
        },
        methods: {
            //检测屏幕旋转角度
            screenOrientation() {
                let orientation = screen.orientation || screen.mozOrientation || screen.msOrientation;
                window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", _ => {
                    this.angle = orientation.angle;
                });
            },
            //检测是否充电以及电量
            getBatteryInfo() {
                if (navigator.getBattery) {
                    navigator.getBattery().then(battery => {
                        // 判断是否在充电
                        this.batteryInfo = battery.charging ? `在充电 : 剩余 ${battery.level * 100}%` : `没充电 : 剩余 ${battery.level * 100}%`;
                        // 电池充电状态改变事件
                        battery.addEventListener('chargingchange', _ => {
                            this.batteryInfo = battery.charging ? `在充电 : 剩余 ${battery.level * 100}%` : `没充电 : 剩余 ${battery.level * 100}%`;
                        });
                    });
                } else {
                    this.batteryInfo = '不支持电池状态接口';
                }
            },
            //触发手机振动
            vibrateFun() {
                if (navigator.vibrate) {
                    navigator.vibrate([500, 500, 500]);
                } else {
                    this.vibrateInfo = "您的设备不支持震动";
                }
            },
            //检测网络信号
            updateOnlineStatus() {
                this.onLineInfo = navigator.onLine ? "online" : "offline";
            },
            //打开、关闭全屏
            fullScreenFun() {
                var fullscreenEnabled = document.fullscreenEnabled ||
                    document.mozFullScreenEnabled ||
                    document.webkitFullscreenEnabled ||
                    document.msFullscreenEnabled;
                if (fullscreenEnabled) {
                    let de = document.documentElement;
                    if (this.fullScreenInfo === '打开全屏') {
                        if (de.requestFullscreen) {
                            de.requestFullscreen();
                        } else if (de.mozRequestFullScreen) {
                            de.mozRequestFullScreen();
                        } else if (de.webkitRequestFullScreen) {
                            de.webkitRequestFullScreen();
                        }
                        this.fullScreenInfo = '退出全屏'
                    } else {
                        if (document.exitFullscreen) {
                            document.exitFullscreen();
                        } else if (document.mozCancelFullScreen) {
                            document.mozCancelFullScreen();
                        } else if (document.webkitCancelFullScreen) {
                            document.webkitCancelFullScreen();
                        }
                        this.fullScreenInfo = '打开全屏'
                    }
                } else {
                    this.fullScreenInfo = '浏览器当前不能全屏';
                }
            },
            //浏览器活跃窗口监听
            doFlashTitle() {
                this.timer = setInterval(_ => {
                    if (!this.flashFlag) {
                        document.title = "微信网页版";
                    } else {
                        document.title = `微信（${this.infoNum}）`;
                    }
                    this.flashFlag = !this.flashFlag
                }, 500)
            },
        }
    }
</script>

<style lang="less">
    /* 去除浏览器默认的样式 */
    * {
        margin: 0;
        padding: 0;
    }
     :fullscreen {
        background: pink;
    }
    .webApi {
        position: absolute;
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .options {
        width: 200px;
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        border-radius: 3px;
        background: #ffe019;
        text-align: center;
        color: #ff0000;
        margin-bottom: 30px;
    }
</style>
