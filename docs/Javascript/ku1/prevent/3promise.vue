methods:{
    getBubbleTea(){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                console.log('喝奶茶')
            })
        })
    },
    getHotpot(){
        return new Promise((resolve,reject)=>{
            console.log('吃火锅')
        })
    },
    itemList(){
        this.getShower().then((resolve,reject)=>{
            conso
        })
            console.log('洗澡')
            return this.getBubbleTea()
        }.then(){
            return this.getHotpot()
        }
    }
},
created(){

}