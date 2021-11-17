function Star(uname, uage) {
    this.name = uname
    this.age = uage
    this.sing = function () {
        console.log('会唱歌')
    }
}

let ldh = new Star('刘德华', 55)
console.log(ldh.name)