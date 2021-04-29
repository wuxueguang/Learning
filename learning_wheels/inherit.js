export default function(Child, Parent){
    function F(){}
    F.prototype = Parent.prototype;
    Child.prototype = new F;  // Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
}