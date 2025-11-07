var list_products = [];
async function khoiTao() {
    try {
        list_products = await getListProducts();
        if (list_products && list_products.$values) {
            // Ánh xạ thành camelCase để nhất quán
            list_products = list_products.$values.map(p => ({
                masp: p.Masp,
                name: p.Name,
                company: p.Company,
                img: p.Img,
                price: p.Price,
                star: p.Star,
                rateCount: p.RateCount,
                promo: p.Promo ? { name: p.Promo.Name, value: p.Promo.Value } : null,
                detail: p.Detail // Giả sử có Detail
            }));
        } else {
            list_products = [];
        }
        capNhat_ThongTin_CurrentUser();
        addEventCloseAlertButton();
    } catch (error) {
        console.error('Lỗi khi khởi tạo:', error);
        addAlertBox('Không thể tải dữ liệu sản phẩm. Vui lòng thử lại.', '#FF6347', '#fff', 5000);
    }
}

function setListProducts(newList) {
    window.localStorage.setItem('ListProducts', JSON.stringify(newList));
}

async function getListProducts() {
    try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('API không phản hồi');
        return await response.json();
    } catch (error) {
        console.error('Lỗi khi lấy sản phẩm:', error);
        return [];
    }
}

function timKiemTheoTen(list, ten, soluong) {
    var tempList = copyObject(list);
    var result = [];
    ten = ten.toLowerCase().trim();
    for (var sp of tempList) {
        if (sp.name && sp.name.toLowerCase().includes(ten)) {
            result.push(sp);
        }
    }
    return result.slice(0, soluong || result.length);
}

async function timKiemTheoMa(list, ma) {
    if (!list || list.length === 0) {
        const response = await fetch(`/api/products/${ma}`);
        return response.ok ? await response.json() : null;
    }
    return list.find(l => l.masp == ma);
}


function copyObject(o) {
    return JSON.parse(JSON.stringify(o));
}

function addAlertBox(text, bgcolor, textcolor, time) {
    var al = document.getElementById('alert');
    al.childNodes[0].nodeValue = text;
    al.style.backgroundColor = bgcolor;
    al.style.opacity = 1;
    al.style.zIndex = 200;

    if (textcolor) al.style.color = textcolor;
    if (time)
        setTimeout(function () {
            al.style.opacity = 0;
            al.style.zIndex = 0;
        }, time);
}

function addEventCloseAlertButton() {
    document.getElementById('closebtn')
        .addEventListener('mouseover', (event) => {
            event.target.parentElement.style.opacity = 0;
            event.target.parentElement.style.zIndex = 0;
        });
}

function themVaoGioHang(masp, productName) {
    let guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
    
    let product = guestCart.find(p => p.ma === masp);

    if (product) {
        product.soluong++;
    } else {
        guestCart.push({ ma: masp, soluong: 1, date: new Date() });
    }

        localStorage.setItem("guestCart", JSON.stringify(guestCart));
        addAlertBox(`Đã thêm ${productName} vào giỏ hàng`, '#4CAF50', '#fff', 3000);
        
        capNhat_ThongTin_CurrentUser();
    }

    function getListUser() {
    var data = JSON.parse(window.localStorage.getItem('ListUser')) || [];
    var l = [];
    for (var d of data) {
        l.push(d);
    }
    return l;
}

function setListUser(l) {
    window.localStorage.setItem('ListUser', JSON.stringify(l));
}

function showTaiKhoan(show) {
    var value = (show ? "scale(1)" : "scale(0)");
    var div = document.getElementsByClassName('containTaikhoan')[0];
    div.style.transform = value;
}

function capNhat_ThongTin_CurrentUser() {
    const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
    const itemCount = guestCart.reduce((total, item) => total + item.soluong, 0);
    document.getElementsByClassName('cart-number')[0].textContent = itemCount;
}

function getTongSoLuongSanPhamTrongGioHang() {
    const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
    return guestCart.reduce((total, item) => total + item.soluong, 0);
}

function numToString(num, char) {
    return num.toLocaleString().split(',').join(char || '.');
}

function stringToNum(str, char) {
    return Number(str.split(char || '.').join(''));
}

function autocomplete(inp, arr) {
    var currentFocus;
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) {
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) {
            if (currentFocus > -1) {
                if (x) {
                    x[currentFocus].click();
                    e.preventDefault();
                }
            }
        }
    });

    function addActive(x) { 
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

function addTags(nameTag, link) {
    var new_tag = `<a href=` + link + `>` + nameTag + `</a>`;
    var khung_tags = document.getElementsByClassName('tags')[0];
    khung_tags.innerHTML += new_tag;
}

function addProduct(p, ele, returnString) {
    if (!p) return;
    if (!p.promo) p.promo = { name: '', value: '' };
    promo = new Promo(p.promo.name, p.promo.value);
    product = new Product(p.masp, p.name, p.img, p.price, p.star, p.rateCount, promo);
    return addToWeb(product, ele, returnString);
}

function addHeader() {
    document.write(`        
	<div class="header group">
        <div class="logo">
            <a href="/">
                <img src="/img/logo2.png" alt="Trang chủ Raumartphone Store" title="Trang chủ Raumartphone Store">
            </a>
        </div>
        <div class="content">
            <div class="search-header" style="position: relative; left: 162px; top: 1px;">
                <form class="input-search" method="get" action="/">
                    <div class="autocomplete">
                        <input id="search-box" name="search" autocomplete="off" type="text" placeholder="Nhập từ khóa tìm kiếm...">
                        <button type="submit">
                            <i class="fa fa-search"></i>
                            Tìm kiếm
                        </button>
                    </div>
                </form>
                <div class="tags">
                    <strong>Từ khóa: </strong>
                </div>
            </div>
            <div class="tools-member">
                <div class="member">
                    <a>
                        <i class="fa fa-user"></i>
                        Tài khoản
                    </a>
                </div>
                <div class="cart">
                    <a href="/giohang">
                        <i class="fa fa-shopping-cart"></i>
                        <span>Giỏ hàng</span>
                        <span class="cart-number"></span>
                    </a>
                </div>
            </div>
        </div>
    </div>`);
}

function addFooter() {
    document.write(`
    <div id="alert">
        <span id="closebtn">&otimes;</span>
    </div>
    <div class="copy-right">
        <p><a href="/">Raumartphone</a> - All rights reserved © 2025 - Designed by Group Raumartphone
    </div>`);
}

function addPlc() {
    document.write(`
    <div class="plc">
        <section>
            <ul class="flexContain">
                <li>Giao hàng toàn quốc</li>
                <li>Thanh toán linh hoạt: tiền mặt, visa / master, trả góp</li>
                <li>Trải nghiệm sản phẩm tại nhà</li>
                <li>Lỗi đổi tại nhà trong 7 ngày đối với máy mới</li>
                <li>Hỗ trợ suốt thời gian sử dụng.
                    <br>Hotline:
                    <a href="tel:0123456789" style="color: #288ad6;">0123456789</a>
                </li>
            </ul>
        </section>
    </div>`);
}

function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

function gotoTop() {
    if (window.jQuery) {
        jQuery('html, body').animate({ scrollTop: 0 }, 100);
    } else if (window.scrollTo) {
        // Dùng native smooth scroll nếu trình duyệt hỗ trợ
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        // Fallback cơ bản cho các trình duyệt cũ
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
