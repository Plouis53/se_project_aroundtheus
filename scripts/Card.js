export default class Card {
  constructor({ name, link }) {
    this._name = name;
    this._link=link;
    
  }
}

testMethod (){
    console.log(this.name);
}

getView(){

}