<!--  -->
<template>
  <div></div>
</template>

<script lang="ts">
import {} from "vue";

interface position {
  x: number;
  y: number;
}

const bigData = {
  // 定义一个大数据的指令
  mounted(el: Element, binding: any) {
    console.log(binding);
    const width = el.clientWidth;
    const height = el.clientHeight;
    var center: position = {
      x: width / 2,
      y: height / 2,
    };
    var radius = Math.floor(Math.sqrt(center.x ** 2 + center.y ** 2));
    if (Array.isArray(binding.value)) {
      var position: position = {
        x: 20,
        y: 20,
      };
      const frag = document.createDocumentFragment();
      while (binding.value.length) {
        var index = Math.floor(Math.random() * binding.value.length);
        var content = binding.value.splice(index, 1);
        var element: Element | boolean = setStyle(
          position,
          width,
          height,
          radius,
          content
        );
        if (element) {
          frag.appendChild(element as Element);
        } else {
          break;
        }
      }
      el.appendChild(frag);
    }
    function setStyle(
      position: position,
      width: number,
      height: number,
      radius: number,
      content: string
    ): Element | boolean {
      const text = document.createElement("p");
      text.style.color =
        "rgba(" +
        Math.floor(Math.random() * 256) +
        "," +
        Math.floor(Math.random() * 256) +
        "," +
        Math.floor(Math.random() * 256) +
        "," +
        (Math.random() * 0.2 + 0.8).toFixed(1) +
        ")";
      var fontSize: number = setFontSize(position, radius);
      var w: number = (content[0].length * fontSize) / 2 + 50;
      var h: number = fontSize;
      if (position.x + w > width - 20) {
        position.y += h;
        position.x = 10;
      } else {
        position.x = position.x + w;
      }
      if (position.y > height) {
        return false;
      }
      text.style.transform = `rotate(${Math.random() * 180 -
        90}deg) translate(-50%,-50%)`;
      text.style.fontSize = fontSize + "px";
      text.style.left = position.x + "px";
      text.style.top = position.y + "px";
      text.innerText = content;
      text.style.width = w + "px";
      text.style.height = h + "px";
      text.style.position = "absolute";
      text.style.fontWeight = (Math.random() * 500 + 200).toString();

      return text;
    }
    function setFontSize(position: position, radius: number): number {
      var distance = Math.floor(
        Math.sqrt((center.x - position.x) ** 2 + (center.y - position.y) ** 2)
      );
      var interval = radius - distance;
      return Math.floor((Math.random() * interval) / 10 + interval / 10) > 12
        ? Math.floor((Math.random() * interval) / 10 + interval / 10)
        : 12;
    }
  },
};

export default {
  name: "bigData",
  directives: {
    bigData,
  },
  setup() {
    return {
      citys: [
        "成都市",
        "绵阳市",
        "自贡市",
        "攀枝花市",
        "泸州市",
        "德阳市",
        "广元市",
        "遂宁市",
        "内江市",
        "乐山市",
        "资阳市",
        "宜宾市",
        "南充市",
        "达州市",
        "雅安市",
        "广安市",
        "巴中市",
        "眉山市",
        "成都市",
        "绵阳市",
        "自贡市",
        "攀枝花市",
        "泸州市",
        "德阳市",
        "广元市",
        "遂宁市",
        "内江市",
        "乐山市",
        "资阳市",
        "宜宾市",
        "南充市",
        "达州市",
        "雅安市",
        "广安市",
        "巴中市",
        "眉山市",
        "成都市",
        "绵阳市",
        "自贡市",
        "攀枝花市",
        "泸州市",
        "德阳市",
        "广元市",
        "遂宁市",
        "内江市",
        "乐山市",
        "资阳市",
        "宜宾市",
        "南充市",
        "达州市",
        "雅安市",
        "广安市",
        "巴中市",
        "眉山市",
        "成都市",
        "绵阳市",
      ],
    };
  },
};
</script>
<style scoped lang="less">
div {
  color: white;
  width: 400px;
  height: 400px;
  margin: 100px auto;
  position: relative;
  overflow: hidden;
}
div > p {
  position: absolute;
}
</style>
