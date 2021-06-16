import instance from ".";
export default function (data: string) {
    console.log(data)
    return instance({
        url: "/sugrec",
        params: {
            json: "1",
            prod: "pc",
            from: "pc_web",
            wd: data
        }
    })
}