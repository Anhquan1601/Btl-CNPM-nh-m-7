/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))



/*=============== QUESTIONS ACCORDION ===============*/
const accordionItems = document.querySelectorAll('.questions__item')

accordionItems.forEach((item) => {
    const accordionHeader = item.querySelector('.questions__header')

    accordionHeader.addEventListener('click', () => {
        const openItem = document.querySelector('.accordion-open')

        toggleItem(item)

        if (openItem && openItem !== item) {
            toggleItem(openItem)
        }
    })
})

const toggleItem = (item) => {
    const accordionContent = item.querySelector('.questions__content')

    if (item.classList.contains('accordion-open')) {
        accordionContent.removeAttribute('style')
        item.classList.remove('accordion-open')
    } else {
        accordionContent.style.height = accordionContent.scrollHeight + 'px'
        item.classList.add('accordion-open')
    }

}

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)


/*=============== Support ===============*/
function SendMail() {
    var params = {
        from_name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        message: document.getElementById("message").value
    }
    emailjs.send("service_x7s3pyy", "template_icvokua", params).then(function (res) {
        Swal.fire({
            title: "Thành công",
            text: "Bạn đã gửi phản hồi!",
            icon: "success"
        });
    })

}

/*=============== Card ===============*/
const btn = document.querySelectorAll("article button")
btn.forEach(function (button, index) {
    button.addEventListener("click", function (event) {
        {
            var btnItem = event.target
            var product = btnItem.parentElement
            var productImg = product.parentElement.querySelector("img").src
            var productName = product.parentElement.querySelector("h3").innerText
            var productPrice = product.parentElement.querySelector("span").innerText
            addcart(productPrice, productImg, productName)

        }
    })

})
function addcart(productPrice, productImg, productName) {
    var addtr = document.createElement("tr")
    var cartItem = document.querySelectorAll("tbody tr")
    for (var i = 0; i < cartItem.length; i++) {
        var productT = document.querySelectorAll(".title")
        if (productT[i].innerHTML === productName) {
            Swal.fire("Sản phẩm đã có trong giỏ!");
            return
        }
    }
    var trcontent = '<tr><td style="display: flex;align-items: center;"><img style="width: 70px" src="' + productImg + '" alt=""><span class="title productName">' + productName + '</span></td><td><p><span class="price">' + productPrice + '</span><sup>d</sup></p></td><td><input style="width: 30px; outline: none;" type="number" class="quantity" value="1" min="1"></td><td style="cursor: pointer;"><span class="cart-delete">Xoá</span></td></tr>'
    addtr.innerHTML = trcontent
    var cartTable = document.querySelector("tbody")
    cartTable.append(addtr)
    carttotal()
    deletecart()
    SendMailOrder(productPrice, productName)
}
let products = []

//------total price--------//
function carttotal() {
    var cartItem = document.querySelectorAll("tbody tr")
    var totalC = 0
    //console.log(cartItem);
    for (var i = 0; i < cartItem.length; i++) {
        var inputValue = cartItem[i].querySelector("input").value
        //console.log(inputValue)
        var productPrice = cartItem[i].querySelector(".price").innerHTML
        //console.log(productPrice)
        var totalA = inputValue * productPrice * 1000
        //totalB = totalA.toLocaleString('de-DE')
        //console.log(totalB);
        totalC = totalC + totalA
        //totalD = totalC.toLocaleString('de-DE')
        //console.log(totalC)

    }
    var cartTotalA = document.querySelector(".price-total span")
    var cartPrice = document.querySelector(".cart-icon span")
    cartTotalA.innerHTML = totalC.toLocaleString('de-DE')
    cartPrice.innerHTML = totalC.toLocaleString('de-DE')
    //console.log(cartTotalA)
    iputchange()
}



//------Delete card--------//
function deletecart() {
    var cartItem = document.querySelectorAll("tbody tr")
    for (var i = 0; i < cartItem.length; i++) {
        var productT = document.querySelectorAll(".cart-delete")
        productT[i].addEventListener("click", function (event) {
            var cartDelete = event.target
            var cartitemR = cartDelete.parentElement.parentElement
            cartitemR.remove()
            //console.log(cartitemR)
            carttotal()
        })

    }
}
function iputchange() {
    var cartItem = document.querySelectorAll("tbody tr")
    for (var i = 0; i < cartItem.length; i++) {
        var inputValue = cartItem[i].querySelector("input")
        inputValue.addEventListener("change", function (event) {
            carttotal()
        })
    }
}


const cartshow = document.querySelector(".cart-button")
cartshow.addEventListener("click", function () {

    document.querySelector(".cart").style.right = "0"
})

const cartbtn = document.querySelector(".fa-times")
cartbtn.addEventListener("click", function () {

    document.querySelector(".cart").style.right = "-100%"

})

const SendMailOrder = (productPrice, productName) => {
    // var params = {
    //     from_name: document.getElementById("name").value,
    //     email: document.getElementById("email").value,
    //     phone: document.getElementById("phone").value,
    //     message: document.getElementById("message").value,
    // }
    const info = { productName, productPrice }
    products.push(info)
    console.log(products)


    if ((params.from_name || "").trim() === "") alert("khong duoc de trong");
    else if ((params.email || "").trim() === "") alert("khong duoc de trong");
    else if ((params.phone || "").trim() === "") alert("khong duoc de trong");
    // else emailjs.send("service_x7s3pyy", "template_icvokua", params).then(function (res) {
    //     Swal.fire({
    //         title: "Thành công",
    //         text: "Bạn đã gửi phản hồi!",
    //         icon: "success"
    //     });
    // })

}
