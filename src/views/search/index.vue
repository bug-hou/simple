<!--  -->
<template>
  <div
    :class="['main', { blur: isBlur }, { transition: isTransition }]"
    @click.self="getBlur"
  >
    <div :class="['time', { shadow: isShadow }, { transition: isTransition }]">
      <p>{{ time }}</p>
    </div>
    <input
      type="text"
      autofocus="true"
      v-model="inputValue"
      @focus="getFocus"
      :class="[{ shadow: isShadow }, { transition: isTransition }]"
      @keydown.enter="push"
    />
    <div class="choose" @click="changeActive" v-leave="current">
      <p
        v-for="(item, index) in interfaceApi.slice(0, 3)"
        :key="item.id"
        :class="[
          'iconfont',
          item.icon,
          { active: current == index + 1 },
          { shadow: isShadow },
        ]"
        :data-index="index + 1"
        :title="item.title"
      ></p>
    </div>
    <div
      class="list shadow"
      v-show="list.length && isBlur"
      @click="push"
      v-destory.listDestory="isBlur"
    >
      <p v-for="(item, index) in list" :key="item.id" :data-index="index">
        {{ item.data }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref, watch, customRef } from "vue";

import getSearchData from "../../network/search";

interface search {
  id: string;
  name: string;
  value: string;
  icon: string;
  title: string;
}

interface listData {
  id: string;
  data: string;
}

const leave = {
  updated(el: Element, binding: any) {
    if (binding.value != binding.oldValue) {
      var notify: string = binding.notify ? binding.notify : "leave";
      el.children[binding.oldValue - 1].classList.add(notify);
      setTimeout(() => {
        el.children[binding.oldValue - 1].classList.remove(notify);
      }, 1000);
    }
  },
};
const destory = {
  updated(el: Element, binding: any) {
    if (!binding.value) {
      var modifiers: string = Object.keys(binding.modifiers)[0]
        ? Object.keys(binding.modifiers)[0]
        : "leave";
      el.classList.add(modifiers);
      setTimeout(() => {
        el.classList.remove(modifiers);
      }, 1000);
    }
  },
};
export default {
  name: "search",
  directives: {
    leave,
    destory,
  },
  setup() {
    const date = new Date();
    // 模糊效果
    var isBlur = ref(true);
    // 阴影效果
    var isShadow = ref(true);
    // 过渡动画效果
    var isTransition = ref(true);
    // 来绑定当前使用的什么搜索引擎
    var current = ref(1);
    //
    var inputValue = myRef("");

    const interfaceApi: Array<search> = [
      {
        id: "ss123",
        name: "baidu",
        value: "https://www.baidu.com/s?ie=utf-8&word=",
        icon: "icon-baidu1",
        title: "百度搜索",
      },
      {
        id: "ss456",
        name: "magi",
        value: "https://magi.com/search?q=",
        icon: "icon-magi",
        title: "magi搜索",
      },
      {
        id: "ss789",
        name: "biying",
        value: "https://cn.bing.com/search?q=",
        icon: "icon-biying",
        title: "必应搜索",
      },
      {
        id: "ss147",
        name: "360",
        value: "https://www.so.com/s?q=",
        icon: "icon-icon-test",
        title: "360搜索",
      },
      {
        id: "ss258",
        name: "google",
        value: "https://www.google.com/search?q=",
        icon: "icon-_huabanfuben",
        title: "谷歌搜索",
      },
      {
        id: "ss369",
        name: "sougou",
        value: "https://www.sogou.com/web?query=",
        icon: "icon-sougousousuo",
        title: "搜狗搜索",
      },
    ];

    var list: Array<listData> = reactive([]);
    var hours = date
      .getHours()
      .toString()
      .padStart(2, "0");
    var minutes = date
      .getMinutes()
      .toString()
      .padStart(2, "0");
    var seconds = date
      .getSeconds()
      .toString()
      .padStart(2, "0");
    var time = ref(hours + ":" + minutes + ":" + seconds);

    function getBlur(e: any) {
      isBlur.value = false;
      isShadow.value = false;
    }
    function myRef(value: string) {
      return customRef((track: Function, trigger: Function): any => {
        return {
          get() {
            track();
            return value;
          },
          set(newValue: string) {
            setTimeout(() => {
              value = newValue;
              var data = getSearchData(value);
              data.then((res) => {
                if (Array.isArray(res.data.g)) {
                  res.data.g.forEach((item: any, index: number) => {
                    var obj: listData = {
                      id: item.sa,
                      data: item.q,
                    };
                    list.splice(index, 1, obj);
                  });
                } else {
                  var len = list.length;
                  for (var i = 0; i < len; i++) list.shift();
                }
              });
              if (!value.length) {
                var len = list.length;
                for (var i = 0; i < len; i++) {
                  list.shift();
                }
              }
            }, 50);
          },
        };
      });
    }
    function getFocus() {
      isBlur.value = true;
      isShadow.value = true;
    }
    function changeActive(e: any) {
      if (e.target.nodeName === "P") {
        current.value = e.target.dataset.index;
      }
    }
    function push(e: any) {
      if (e.target.nodeName == "P") {
        var tempwindow: any = window.open("_blank");
        tempwindow.location.href =
          interfaceApi[current.value - 1].value +
          list[e.target.dataset.index - 1].data;
      } else if (e.target.nodeName == "INPUT".toUpperCase()) {
        if (inputValue.value) {
          // console.log(inputValue.value);
          var tempwindow: any = window.open("_blank");
          tempwindow.location.href =
            interfaceApi[current.value - 1].value + inputValue.value;
        }
      }
    }
    setInterval(() => {
      if (+seconds >= 59) {
        minutes = (+minutes + 1).toString().padStart(2, "0");
        seconds = "00";
        if (+minutes >= 59) {
          hours = (+hours + 1).toString().padStart(2, "0");
          minutes = "00";
        }
      } else {
        seconds = (+seconds + 1).toString().padStart(2, "0");
      }
      time.value = hours + ":" + minutes + ":" + seconds;
    }, 1000);
    return {
      time,
      isBlur,
      isShadow,
      isTransition,
      current,
      inputValue,
      list,
      interfaceApi,
      getBlur,
      getFocus,
      changeActive,
      push,
    };
  },
};
</script>
<style scoped lang="less">
@keyframes show {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}
@keyframes hidden {
  0% {
    left: 0%;
  }
  100% {
    left: 100%;
  }
}
@keyframes extends {
  0% {
    clip-path: inset(0 0 100% 0);
  }
  100% {
    clip-path: inset(0 0 0 0);
  }
}
@keyframes listDestory {
  0% {
    clip-path: inset(0 0 0 0);
  }
  100% {
    clip-path: inset(0 0 100% 0);
  }
}
.main {
  width: 100%;
  height: 100%;
  position: relative;
  .list {
    animation: extends 1s;
    border-radius: 30px;
    left: 50%;
    top: 38%;
    transform: translateX(-50%);
    width: 35%;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.15);
    text-align: center;
    position: relative;
    font-size: 1.2rem;
    color: white;
    overflow: hidden;
    p {
      width: 100%;
      height: 30px;
      line-height: 30px;
      font-size: 0.8rem;
      text-align: start;
      text-indent: 1em;
      transition: all 0.2s;
      &:hover {
        text-indent: 1.8em;
        background-color: rgba(255, 255, 255, 0.3);
        border-top-color: rgba(255, 255, 255, 0.3);
        border-left-color: rgba(255, 255, 255, 0.3);
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
        cursor: pointer;
      }
    }
  }
  .listDestory {
    animation: listDestory 1s;
  }
  .choose {
    width: 20%;
    display: flex;
    justify-content: space-evenly;
    position: absolute;
    align-items: center;
    left: 50%;
    top: 38%;
    transition: all 2s;
    transform: translate(-50%, -50%);
    p {
      overflow: hidden;
    }
  }
  .iconfont {
    font-size: 1.5rem;
    color: white;
    background-color: rgba(0, 0, 0, 0.15);
    padding: 5px 15px;
    border-radius: 5px;
    position: relative;
    overflow: hidden;
    text-shadow: -1px -1px 1px white, 1px 1px 1px black;
  }
  .active::after {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 110%;
    height: 110%;
    background-color: rgba(213, 23, 23, 0.8);
    animation: show 2s;
    z-index: -99;
  }
  .time {
    display: flex;
    justify-content: space-evenly;
    position: absolute;
    left: 50%;
    top: 18%;
    height: 40px;
    transform: translate(-50%, -50%);
    transition: all 2s;
    padding: 5px;
    p {
      width: 100%;
      height: 100%;
      font-size: 3rem;
      background-image: linear-gradient(#bf1363, #e6aace, #06bee1, #7de2d1);
      color: transparent;
      background-clip: text;
      -webkit-background-clip: text;
      font-weight: bold;
      text-align: center;
      line-height: 40px;
    }
  }
  input {
    border-radius: 30px;
    left: 50%;
    top: 30%;
    transform: translate(-50%, -50%);
    width: 35%;
    height: 45px;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.15);
    text-align: center;
    position: relative;
    font-size: 1.2rem;
    color: white;
    transition: all 2s;
  }
  input::placeholder {
    font-size: 1.2rem;
    color: white;
  }
}
.blur {
  backdrop-filter: blur(10px);
}
.shadow {
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.2)
  );
  border: 2px solid transparent;
  border-top-color: rgba(255, 255, 255, 0.3);
  border-left-color: rgba(255, 255, 255, 0.3);
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}
.transition {
  transition: all 2s;
}
.leave::after {
  animation: hidden 1.1s;
  content: "";
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 110%;
  height: 110%;
  background-color: rgba(213, 23, 23, 0.8);
  z-index: -99;
}
</style>
