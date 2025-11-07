function User(username, pass, ho, ten, email, products, donhang) {
    this.ho = ho || '';
    this.ten = ten || '';
    this.email = email || '';
    this.username = username;
    this.pass = pass;
    this.products = products || []; 
    this.donhang = donhang || [];
}

function equalUser(u1, u2) {
    return (u1.username === u2.username && u1.pass === u2.pass);
}

function Promo(name, value) { // khuyen mai
    this.name = name; // giamGia, traGop, giaReOnline
    this.value = value;

    this.toWeb = function () {
        if (!this.name) return "";
        var contentLabel = "";
        switch (this.name) {
            case "giamgia":
                contentLabel = `<i class="fa fa-bolt"></i> Giảm ` + this.value + `&#8363;`;
                break;
            case "tragop":
                contentLabel = `Trả góp ` + this.value + `%`;
                break;
            case "giareonline":
                contentLabel = `Giá rẻ online`;
                break;
            case "moiramat":
                contentLabel = "Mới ra mắt";
                break;
        }

        var label =
            `<label class=` + this.name + `>
            ` + contentLabel + `
        </label>`;

        return label;
    }
}

function Product(masp, name, img, price, star, rateCount, promo) {
    this.masp = masp; // Unique product identifier
    this.img = img; // Image URL
    this.name = name; // Product name
    this.price = price; // Product price
    this.star = star; // Rating in stars
    this.rateCount = rateCount; // Number of ratings
    this.promo = promo; // Promo object
}
function addToWeb(p, ele, returnString) {
    if (!p) return;
    if (!p.promo) p.promo = { name: '', value: '' };
    promo = new Promo(p.promo.name, p.promo.value);
    product = new Product(p.masp, p.name, p.img, p.price, p.star, p.rateCount, promo);
    var rating = "";
    if (product.rateCount > 0) {
        for (var i = 1; i <= 5; i++) {
            if (i <= product.star) {
                rating += `<i class="fa fa-star"></i>`;
            } else {
                rating += `<i class="fa fa-star-o"></i>`;
            }
        }
        rating += `<span>` + product.rateCount + ` đánh giá</span>`;
    }
    var price = `<strong>` + product.price + `&#8363;</strong>`;
    if (promo.name === "giareonline") {
        price = `<strong>` + promo.value + `&#8363;</strong>
                <span>` + product.price + `&#8363;</span>`;
    }
    var chitietSp = '/chitietsanpham?' + encodeURIComponent((product.name || '').replace(/\s+/g, '-'));
    var imgSrc = product.img || '/img/default.jpg'; // Fallback hình ảnh
    var newLi =
        `<li class="sanPham">
            <a href="` + chitietSp + `">
                <img src="` + imgSrc + `" alt="` + (product.name || '') + `">
                <h3>` + (product.name || '') + `</h3>
                <div class="price">
                    ` + price + `
                </div>
                <div class="ratingresult">
                    ` + rating + `
                </div>
                ` + promo.toWeb() + `
                <div class="tooltip">
                    <button class="themvaogio" onclick="themVaoGioHang('` + product.masp + `', '` + (product.name || '') + `'); return false;">
                        <span class="tooltiptext" style="font-size: 15px;">Thêm vào giỏ</span>
                        +
                    </button>
                </div>
            </a>
        </li>`;
    if (returnString) return newLi;
    var products = ele || document.getElementById('products');
    products.innerHTML += newLi;
}