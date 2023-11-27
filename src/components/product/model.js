export class Money{
    constructor(amount,currency){
        this.amount = amount
        this.currency = currency
    }
}

export class Product {
    constructor({id,name, image, price}){
        this.id = id
        this.name = name 
        this.image = image
        this.price = new Money( price.amount,price.currency)
    }
}


export class CartItem{
    constructor(item){
        this.item = new Product(item)
        this.quantity = item.quantity
        this.cost = new Money((item.price.amount * item.quantity), item.price.currency)
    }
}

