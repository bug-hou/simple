import bigData from "./index.vue"
export default {
    install(app: any, option: object) {
        app.component(bigData.name, bigData);
    }
}