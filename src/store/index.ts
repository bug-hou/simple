import { createStore } from 'vuex'

import getCity from "../network/city";

export default createStore({
  state: {
    citys: [] as Array<any>,
    provances: [] as Array<String>
  },
  mutations: {
    addProvances(state: any, data: string) {
      state.provances.push(data as string)
    },
    addCitys(state: any, city: any) {
      state.citys = city;
    }
  },
  actions: {
    getCityData({ commit }) {
      var provinces: Array<String> = [];
      var cityData: any = getCity();
      cityData.then(
        (res: any) => {
          var cityArr: any = res.data.result;
          if (Array.isArray(cityArr)) {
            cityArr.forEach((item: any) => {
              if (!provinces.includes(item.province)) {
                commit("addProvances", item.province)
              }
            });
            commit("addCitys", cityArr)
          }
        },
        (reason: any) => {
          console.log("我没有发给我大");
        }
      );
    }
  },
  modules: {
  }
})
