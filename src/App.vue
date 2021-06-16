<!--  -->
<template>
  <div class="root">
    <router-view class="view"> </router-view>
  </div>
</template>

<script>
import {} from "vue";
import { useStore } from "vuex";
const mixin = {
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      var mapObj = new AMap.Map("iCenter"); //以为这里是要获取地图容器的id,所以要写在mounted之中
      var geolocation;
      var that = this;
      mapObj.plugin("AMap.Geolocation", function() {
        geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, // 是否使用高精度定位，默认:true
          timeout: 10000, // 超过10秒后停止定位，默认：无穷大
          maximumAge: 0, // 定位结果缓存0毫秒，默认：0
          convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true, // 显示定位按钮，默认：true
          buttonPosition: "LB", // 定位按钮停靠位置，默认：'LB'，左下角
          buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          showMarker: true, // 定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true, // 定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true, // 定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true, // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        });
        mapObj.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", that.onComplete); // 返回定位信息
        AMap.event.addListener(geolocation, "error", that.onError); // 返回定位出错信息
      });
    },
    onComplete(obj) {
      this.positionInfo = obj;
      var res =
        "经纬度：" +
        obj.position +
        "\n精度范围：" +
        obj.accuracy +
        "米\n定位结果的来源：" +
        obj.location_type +
        "\n状态信息：" +
        obj.info +
        "\n地址：" +
        obj.formattedAddress +
        "\n地址信息：" +
        JSON.stringify(obj.addressComponent, null, 4);
    },
    onError(obj) {
      console.log(obj);
    },
  },
};
export default {
  name: "app",
  mixins: [mixin],
  setup() {
    const { dispatch } = useStore();
    dispatch("getCityData");
    return {
      colors: ["#06BEE1", "#D1D0A3", "#ef8354", "#4E598C", "#E6AACE"],
    };
  },
};
</script>
<style scoped lang="less">
@import url(//at.alicdn.com/t/font_2609761_yqsvhhyr86h.css);
.root {
  width: 100vw;
  height: 100vh;
}
p {
  width: 100%;
  height: 1px;
}
.view {
  width: 100%;
  height: 100%;
}
</style>
