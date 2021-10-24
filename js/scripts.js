function sayHello(text) {
    console.log(text + " " + this.firstName + " " + this.lastName);
}

var person = {
    firstName: "Jan",
    lastName: "Kowalski"
};

var hello = sayHello.bind(person, "cześć"); //bind nie wywołuje funkjci tylko tworzy jej kopię--> hello();

//_____________________________________________________________________ WŁASNA FUNKCJA BIND

function bind2(fn, obj){ //przekazujemy funkcję, obiekt, i pomimo, że go nie zadelkarowaliśmy param1 (a nawet dowolną ilość parametrów)
    // dzięki pseudotablicy arguments widzimy wszystkie nawet nadmiarowe parametry przekazane do funkcji (w tym własnie param1)

    arr = Array.prototype.slice.call(arguments,2); //pożyczamy dzięki call funkcję slice z array (arguments to pseudotablica i nie ma do niej bezpośrednio dostępu)
                                                   // [sayHello, person, "Cześć"] --> wycinamy 2 pierwsze wartości tablicy i zostaje "Cześć"

    return function(){      //zwracamy funkcję, która zrobi sayHello.apply(person, "Cześć") --> po wywołaniu hello2() dostaniemy --> Cześć Jan Kowalski
        fn.apply(obj, arr);
    };
}

var hello2 = bind2(sayHello, person, "Cześć"); //(fn, obj, param1)

 