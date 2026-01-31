import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Minus,
  Trash2,
  ShoppingCart,
  Printer,
  X,
} from "lucide-react";
import "./styles.css";

// Hàm bỏ dấu tiếng Việt
const removeVietnameseTones = (str) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
};

const CafePOS = () => {
  const menuData = {
    Cafe: [
      { name: "Cafe đá ", price: 25000, hasTemp: true, hasNoSugar: true },
      { name: "Cafe phin đen ", price: 25000, hasTemp: true, hasNoSugar: true },
      { name: "Cafe sữa", price: 27000, hasTemp: true, hasCoffeeOptions: true },
      {
        name: "Cafe phin sữa",
        price: 27000,
        hasTemp: true,
        hasCoffeeOptions: true,
      },
      { name: "Bạc xỉu", price: 28000, hasTemp: true, hasCoffeeOptions: true },
    ],
    "Đặc Biệt": [
      { name: "Sâm bổ lượng", price: 35000 },
      { name: "Rau má đậu xanh", price: 25000 },
      { name: "Sữa đậu xanh hạt đát", price: 25000 },
      { name: "Rau câu trái dừa", price: 30000 },
    ],
    "Giải Nhiệt": [
      { name: "Sâm la hán quả", price: 25000 },
      { name: "Mủ trôm mủ gòn hạt đát", price: 25000 },
      { name: "Nha đam hạt chia hạt đát", price: 25000 },
      { name: "Cacao sữa đá", price: 25000 },
      { name: "Socola sữa đá", price: 25000 },
      { name: "Chanh muối cam thảo", price: 25000 },
      { name: "Xí muội mơ", price: 25000 },
      { name: "Tắc xí muội", price: 25000 },
      { name: "Đá me dẻo", price: 25000 },
      { name: "Cam ép", price: 25000 },
    ],
    Yaourt: [
      { name: "Yaourt đá", price: 25000 },
      { name: "Yaourt hạt đát", price: 25000 },
      { name: "Yaourt dâu", price: 25000 },
      { name: "Yaourt ổi", price: 25000 },
      { name: "Yaourt việt quất", price: 25000 },
      { name: "Yaourt kiwi", price: 25000 },
      { name: "Yaourt sâm dứa", price: 25000 },
      { name: "Yaourt socola", price: 25000 },
      { name: "Yaourt cafe", price: 25000 },
      { name: "Yaourt bạc hà", price: 25000 },
      { name: "Yaourt cam", price: 25000 },
      { name: "Yaourt dâu tầm", price: 25000 },
    ],
    "Trà Sữa": [
      {
        name: "Trà sữa truyền thống",
        price: 30000,
        maxPrice: 35000,
        hasPriceOptions: true,
      },
      {
        name: "Trà sữa matcha",
        price: 30000,
        maxPrice: 35000,
        hasPriceOptions: true,
      },
      {
        name: "Lục trà sữa dâu",
        price: 30000,
        maxPrice: 35000,
        hasPriceOptions: true,
      },
      {
        name: "Lục trà sữa socola",
        price: 30000,
        maxPrice: 35000,
        hasPriceOptions: true,
      },
      {
        name: "Lục trà sữa khoai môn",
        price: 30000,
        maxPrice: 35000,
        hasPriceOptions: true,
      },
      {
        name: "Trà sữa trân châu đường đen",
        price: 30000,
        maxPrice: 35000,
        hasPriceOptions: true,
      },
      { name: "Trà ô long sữa", price: 25000 },
      { name: "Sirô đá bào", price: 25000 },
    ],
    "Sữa Tươi": [
      { name: "Sữa tươi cafe", price: 25000 },
      { name: "Sữa sâm dứa", price: 25000 },
      { name: "Sữa ổi hồng", price: 25000 },
      { name: "Sữa việt quất", price: 25000 },
      { name: "Sữa kiwi", price: 25000 },
      { name: "Sữa dâu", price: 25000 },
      { name: "Sữa tươi đường đen", price: 25000 },
    ],
    "Trà Trái Cây": [
      { name: "Trà dâu", price: 25000 },
      { name: "Trà chanh", price: 25000 },
      { name: "Trà vải", price: 25000 },
      { name: "Trà việt quất", price: 25000 },
      { name: "Trà măng cầu", price: 25000 },
      { name: "Trà ổi hồng", price: 25000 },
      { name: "Trà bí đao", price: 25000 },
      { name: "Trà đào", price: 25000 },
    ],
    "Trà Nóng": [
      { name: "Trà hoa cúc hạt chia", price: 25000 },
      { name: "Trà lipton hạt chia", price: 25000 },
      { name: "Trà ô long", price: 25000 },
    ],
    "Sinh Tố": [
      { name: "Sinh tố măng cầu", price: 30000 },
      { name: "Sinh tố bơ", price: 30000 },
      { name: "Sinh tố việt quất", price: 30000 },
      { name: "Sinh tố kiwi", price: 30000 },
      { name: "Sinh tố vải", price: 30000 },
      { name: "Sinh tố sapoche", price: 30000 },
      { name: "Sinh tố dâu", price: 30000 },
      { name: "Sinh tố khoai môn", price: 30000 },
      { name: "Sinh tố chanh dây", price: 30000 },
    ],
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [activeTab, setActiveTab] = useState("menu"); // "menu" hoặc "payment"
  const [customerPaid, setCustomerPaid] = useState("");
  const [displayPaid, setDisplayPaid] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [tableLocation, setTableLocation] = useState(""); // "phía trước", "phía sau", "võng trong nhà", "võng ngoài trời"
  const [surcharge, setSurcharge] = useState(0); // Phụ thu
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [activeInput, setActiveInput] = useState(null); // "table", "paid", hoặc "search"
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [tempOptions, setTempOptions] = useState({
    isHot: false,
    lessSweet: false,
    lessIce: false,
    noSweet: false,
    priceOption: "base", // "base" hoặc "max"
    coffeeLevel: "normal", // "more-milk", "less-milk", "more-coffee", "less-coffee", "normal"
  });

  const allItems = useMemo(() => {
    const items = [];
    Object.entries(menuData).forEach(([category, products]) => {
      products.forEach((product) => {
        items.push({ ...product, category });
      });
    });
    return items;
  }, []);

  const filteredItems = useMemo(() => {
    if (!searchTerm) return allItems;
    return allItems.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, allItems]);

  const addToCart = (item) => {
    setSelectedItem(item);
    setTempOptions({
      isHot: false,
      lessSweet: false,
      lessIce: false,
      priceOption: "base",
      coffeeLevel: "normal",
      noSweet: false,
    });
    setShowOptionsModal(true);
  };

  const confirmAddToCart = () => {
    const finalPrice =
      selectedItem.hasPriceOptions && tempOptions.priceOption === "max"
        ? selectedItem.maxPrice
        : selectedItem.price;

    const itemWithOptions = {
      ...selectedItem,
      price: finalPrice,
      options: { ...tempOptions },
      uniqueId: Date.now() + Math.random(),
    };

    setCart([...cart, { ...itemWithOptions, quantity: 1 }]);
    setShowOptionsModal(false);
    setSelectedItem(null);
  };

  const updateQuantity = (uniqueId, delta) => {
    setCart(
      cart
        .map((item) =>
          item.uniqueId === uniqueId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (uniqueId) => {
    setCart(cart.filter((item) => item.uniqueId !== uniqueId));
  };

  const clearCart = () => {
    setCart([]);
    setCustomerPaid("");
    setDisplayPaid("");
    setTableNumber("");
    setTableLocation("");
    setSurcharge(0);
  };

  const total =
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + surcharge;
  const paidAmount = parseFloat(customerPaid) || 0;
  const changeAmount = paidAmount - total;

  const formatCurrency = (amount) => {
    return amount.toLocaleString("vi-VN") + "đ";
  };

  const handlePaidChange = (e) => {
    const value = e.target.value;
    const numbersOnly = value.replace(/\D/g, "");
    setCustomerPaid(numbersOnly);
    if (numbersOnly) {
      setDisplayPaid(parseInt(numbersOnly).toLocaleString("vi-VN"));
    } else {
      setDisplayPaid("");
    }
  };

  const handleKeyboardClick = (value) => {
    if (activeInput === "table") {
      if (value === "backspace") {
        setTableNumber(tableNumber.slice(0, -1));
      } else if (value === "clear") {
        setTableNumber("");
      } else {
        setTableNumber(tableNumber + value);
      }
    } else if (activeInput === "paid") {
      if (value === "backspace") {
        const newValue = customerPaid.slice(0, -1);
        setCustomerPaid(newValue);
        setDisplayPaid(
          newValue ? parseInt(newValue).toLocaleString("vi-VN") : ""
        );
      } else if (value === "clear") {
        setCustomerPaid("");
        setDisplayPaid("");
      } else {
        const newValue = customerPaid + value;
        setCustomerPaid(newValue);
        setDisplayPaid(parseInt(newValue).toLocaleString("vi-VN"));
      }
    } else if (activeInput === "search") {
      let newSearchTerm = searchTerm;
      if (value === "backspace") {
        newSearchTerm = searchTerm.slice(0, -1);
        setSearchTerm(newSearchTerm);
      } else if (value === "clear") {
        newSearchTerm = "";
        setSearchTerm(newSearchTerm);
      } else if (value === "space") {
        newSearchTerm = searchTerm + " ";
        setSearchTerm(newSearchTerm);
      } else {
        newSearchTerm = searchTerm + value;
        setSearchTerm(newSearchTerm);
      }

      // Cập nhật gợi ý món
      if (newSearchTerm.trim()) {
        const suggestions = allItems
          .filter((item) =>
            removeVietnameseTones(item.name).includes(
              removeVietnameseTones(newSearchTerm)
            )
          )
          .slice(0, 10); // Giới hạn 10 món
        setSearchSuggestions(suggestions);
      } else {
        setSearchSuggestions([]);
      }
    }
  };

  const handleInputFocus = (inputType) => {
    setActiveInput(inputType);
    setShowKeyboard(true);
  };

  const handleKeyboardClose = () => {
    setShowKeyboard(false);
    setActiveInput(null);
    setSearchSuggestions([]);
  };

  const handleSelectSuggestion = (item) => {
    setShowKeyboard(false);
    setActiveInput(null);
    setSearchSuggestions([]);
    setSearchTerm("");
    addToCart(item);
  };

  const getOptionsText = (item) => {
    const opts = [];
    if (item.options?.isHot) {
      opts.push("Nóng");
    }
    if (
      item.hasCoffeeOptions &&
      item.options?.coffeeLevel &&
      item.options.coffeeLevel !== "normal"
    ) {
      const coffeeLabels = {
        "more-milk": "Nhiều sữa",
        "less-milk": "Ít sữa",
        "more-coffee": "Cafe nhiều",
        "less-coffee": "Cafe ít",
      };
      opts.push(coffeeLabels[item.options.coffeeLevel]);
    }
    if (item.options?.lessSweet) opts.push("Ít ngọt");
    if (item.options?.lessIce) opts.push("Ít đá");
    if (item.options?.noSweet) opts.push("Không đường");
    return opts.length > 0 ? ` (${opts.join(", ")})` : "";
  };

  const printReceipt = () => {
    if (
      !tableNumber ||
      !tableLocation ||
      !customerPaid ||
      parseFloat(customerPaid) <= 0
    ) {
      alert("Vui lòng nhập số bàn, chọn vị trí và nhập tiền khách đưa!");
      return;
    }

    if (parseFloat(customerPaid) < total) {
      alert(
        `Tiền khách đưa phải lớn hơn hoặc bằng tổng tiền (${formatCurrency(
          total
        )})!`
      );
      return;
    }

    const savedPaid = customerPaid;
    const savedTotal = total;
    const savedCart = JSON.parse(JSON.stringify(cart));
    const savedSurcharge = surcharge;
    const savedChange = parseFloat(savedPaid || 0) - savedTotal;
    const savedDate = new Date().toLocaleString("vi-VN");
    const savedTable = `Bàn số ${tableNumber} ${tableLocation}`;

    let receiptHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Phiếu Bán Hàng</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Courier New', monospace; padding: 10px; max-width: 450px; margin: 0 auto; font-size: 12px; }
          .header { text-align: center; border-bottom: 2px dashed #000; padding-bottom: 10px; margin-bottom: 12px; }
          .title { font-size: 21px; font-weight: bold; margin-bottom: 5px; }
          .subtitle { font-size: 15px; margin: 5px 0; }
          .datetime { font-size: 12px; margin-top: 5px; color: #000; font-weight: bold; }
          .items { margin: 12px 0; }
          .item-header-row { display: flex; justify-content: space-between; font-weight: bold; border-bottom: 2px solid #000; padding-bottom: 5px; margin-bottom: 10px; font-size: 10px; }
          .item-header-row span:nth-child(1) { flex: 1; max-width: 70%; }
          .item-header-row span:nth-child(2) { min-width: 2px; text-align: center; }
          .item-header-row span:nth-child(3) { min-width: 60px; text-align: right; }
          .item-header-row span:nth-child(4) { min-width: 60px; text-align: right; letter-spacing:-1px}
          .item { margin: 8px 0; page-break-inside: avoid; }
          .item-row { display: flex; justify-content: space-between; font-weight: bold; margin-bottom: 3px; align-items: flex-start; font-size: 10px; }
          .item-row .item-name { flex: 1; max-width: 70%; line-height: 1.2; overflow: hidden; text-overflow: ellipsis; letter-spacing:-1px}
          .item-row .item-qty { min-width: 2px; text-align: center; }
          .item-row .item-unit-price { min-width: 60px; text-align: right; }
          .item-row .item-price { min-width: 60px; text-align: right; }
          .item-options { font-size: 10px; color: #000; font-style: italic; margin-top: 2px; font-weight: bold; }
          .total-section { margin-top: 12px; border-top: 2px dashed #000; padding-top: 10px; page-break-inside: avoid; }
          .total-row { display: flex; justify-content: space-between; margin: 5px 0; font-size: 12px; }
          .total-label { font-weight: bold; color: #000; }
          .total-value { font-weight: bold; color: #000; }
          .grand-total { font-size: 17px; font-weight: bold; margin: 8px 0; }
          .payment { border-top: 1px dashed #000; margin-top: 8px; padding-top: 8px; }
          .payment-label { font-weight: bold; color: #000; }
          .payment-value { font-weight: bold; color: #000; }
          .footer { text-align: center; margin-top: 15px; border-top: 2px dashed #000; padding-top: 10px; font-size: 12px; page-break-inside: avoid; }
          .wifi-info { margin-top: 10px; text-align: center; font-weight: bold; font-size: 13px; }
          @media print { 
            body {  padding:0;max-width: 350px; }
            @page {  margin:1.5rem;size: 80mm auto; }
            .item { page-break-inside: avoid; }
            .header { page-break-after: avoid; }
            .total-section { page-break-inside: avoid; }
            .footer { page-break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="title">CAFE LÀNG HOA</div>
          <div class="subtitle">PHIẾU BÁN HÀNG</div>
          <div class="datetime"> ${savedTable} - ${savedDate}</div>
        </div>
        
        <div class="items">
          <div class="item-header-row">
            <span>Tên món</span>
            <span>SL</span>
            <span>Đơn giá</span>
            <span>Thành tiền</span>
          </div>
    `;

    savedCart.forEach((item) => {
      const opts = [];
      if (item.options?.isHot) {
        opts.push("Nóng");
      }
      if (
        item.hasCoffeeOptions &&
        item.options?.coffeeLevel &&
        item.options.coffeeLevel !== "normal"
      ) {
        const coffeeLabels = {
          "more-milk": "Nhiều sữa",
          "less-milk": "Ít sữa",
          "more-coffee": "Cafe nhiều",
          "less-coffee": "Cafe ít",
        };
        opts.push(coffeeLabels[item.options.coffeeLevel]);
      }
      if (item.options?.lessSweet) opts.push("Ít ngọt");
      if (item.options?.lessIce) opts.push("Ít đá");
      if (item.options?.noSweet) opts.push("Không đường");
      const optionsText = opts.length > 0 ? opts.join(", ") : "";

      receiptHTML += `
        <div class="item">
          <div class="item-row">
            <span class="item-name">${item.name}</span>
            <span class="item-qty">x${item.quantity}</span>
            <span class="item-unit-price">${item.price.toLocaleString(
              "vi-VN"
            )}đ</span>
            <span class="item-price">${(
              item.price * item.quantity
            ).toLocaleString("vi-VN")}đ</span>
          </div>
          ${
            optionsText
              ? `<div class="item-options">Ghi chú: ${optionsText}</div>`
              : ""
          }
        </div>
      `;
    });

    receiptHTML += `
        </div>
        
        <div class="total-section">
          <div class="total-row">
            <span class="total-label">Tổng số món:</span>
            <span class="total-value">${savedCart.reduce(
              (sum, item) => sum + item.quantity,
              0
            )}</span>
          </div>
          ${
            savedSurcharge > 0
              ? `
          <div class="total-row">
            <span class="total-label">Phụ thu:</span>
            <span class="total-value">${savedSurcharge.toLocaleString(
              "vi-VN"
            )}đ</span>
          </div>
          `
              : ""
          }
          <div class="total-row grand-total">
            <span class="total-label">TỔNG TIỀN:</span>
            <span class="total-value">${savedTotal.toLocaleString(
              "vi-VN"
            )}đ</span>
          </div>
    `;

    if (savedPaid && parseFloat(savedPaid) > 0) {
      receiptHTML += `
          <div class="payment">
            <div class="total-row">
              <span class="payment-label">Tiền khách đưa:</span>
              <span class="payment-value">${parseFloat(
                savedPaid
              ).toLocaleString("vi-VN")}đ</span>
            </div>
            <div class="total-row" style="font-size: 16px;">
              <span class="payment-label">Tiền thối:</span>
              <span class="payment-value">${savedChange.toLocaleString(
                "vi-VN"
              )}đ</span>
            </div>
          </div>
      `;
    }

    receiptHTML += `
        </div>
        
        <div class="footer">
          <div>Cảm ơn quý khách!</div>
          <div>Hẹn gặp lại!</div>
          <div class="wifi-info">WiFi Password: 22222222</div>
        </div>
      </body>
      </html>
    `;

    const printFrame = document.createElement("iframe");
    printFrame.style.position = "fixed";
    printFrame.style.right = "0";
    printFrame.style.bottom = "0";
    printFrame.style.width = "0";
    printFrame.style.height = "0";
    printFrame.style.border = "none";
    document.body.appendChild(printFrame);

    const doc = printFrame.contentWindow.document;
    doc.open();
    doc.write(receiptHTML);
    doc.close();

    setTimeout(() => {
      printFrame.contentWindow.focus();
      printFrame.contentWindow.print();

      setTimeout(() => {
        document.body.removeChild(printFrame);
        // Clear cart và input sau khi in
        clearCart();
      }, 1000);
    }, 500);
  };

  return (
    <div className="cafe-pos-container">
      <div className="cafe-pos-wrapper">
        <div className="cafe-pos-card">
          <div className="cafe-pos-header">
            <h1 className="cafe-pos-title">☕ Cafe Lang Hoa</h1>
            <p className="cafe-pos-subtitle">Hệ Thống Tính Tiền</p>

            {/* Tabs Navigation */}
            <div className="tabs-navigation">
              <button
                className={`tab-btn ${activeTab === "menu" ? "active" : ""}`}
                onClick={() => setActiveTab("menu")}
              >
                📋 Menu
              </button>
              <button
                className={`tab-btn ${activeTab === "payment" ? "active" : ""}`}
                onClick={() => setActiveTab("payment")}
              >
                💳 Thanh Toán
                {cart.length > 0 && (
                  <span className="cart-badge">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="tabs-content">
            {/* Tab Menu */}
            {activeTab === "menu" && (
              <div className="menu-tab">
                <div className="search-wrapper">
                  <Search className="search-icon" size={20} />
                  <input
                    type="text"
                    placeholder="Tìm kiếm món..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => handleInputFocus("search")}
                    className="search-input"
                    readOnly
                  />
                </div>

                <div className="menu-container">
                  {Object.entries(menuData).map(([category, items]) => {
                    const categoryItems = items.filter(
                      (item) =>
                        !searchTerm ||
                        removeVietnameseTones(item.name).includes(
                          removeVietnameseTones(searchTerm)
                        )
                    );

                    if (categoryItems.length === 0) return null;

                    return (
                      <div key={category} className="category-section">
                        <h3 className="category-title">{category}</h3>
                        <div className="menu-grid">
                          {categoryItems.map((item, idx) => (
                            <div
                              key={idx}
                              onClick={() => addToCart(item)}
                              className="menu-card"
                            >
                              <div className="menu-card-name">{item.name}</div>
                              <div className="menu-card-price">
                                {item.maxPrice
                                  ? `${formatCurrency(
                                      item.price
                                    )} - ${formatCurrency(item.maxPrice)}`
                                  : formatCurrency(item.price)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab Payment */}
            {activeTab === "payment" && (
              <div className="payment-tab">
                {/* Giỏ hàng */}
                <div className="cart-container">
                  <div className="cart-header">
                    <h2 className="cart-title">
                      <ShoppingCart size={24} />
                      Phiếu Tính Tiền
                    </h2>
                    {cart.length > 0 && (
                      <button onClick={clearCart} className="clear-cart-btn">
                        <Trash2 size={18} />
                        Xóa hết
                      </button>
                    )}
                  </div>

                  {cart.length === 0 ? (
                    <div className="cart-empty">
                      <ShoppingCart size={48} className="cart-empty-icon" />
                      <p>Chưa có món nào được chọn</p>
                    </div>
                  ) : (
                    <div className="cart-items">
                      {cart.map((item, idx) => (
                        <div key={idx} className="cart-item">
                          <div className="cart-item-header">
                            <div style={{ flex: 1 }}>
                              <span className="cart-item-name">
                                {item.name}
                              </span>
                              <div className="cart-item-options">
                                {getOptionsText(item)}
                              </div>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.uniqueId)}
                              className="remove-item-btn"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <div className="cart-item-controls">
                            <div className="quantity-controls">
                              <button
                                onClick={() =>
                                  updateQuantity(item.uniqueId, -1)
                                }
                                className="quantity-btn minus"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="quantity-display">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.uniqueId, 1)}
                                className="quantity-btn plus"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            <div className="cart-item-pricing">
                              <div className="cart-item-unit-price">
                                {formatCurrency(item.price)} × {item.quantity}
                              </div>
                              <div className="cart-item-total-price">
                                {formatCurrency(item.price * item.quantity)}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Button Phụ Thu */}
                {cart.length > 0 && (
                  <div className="surcharge-container">
                    <button
                      onClick={() => setSurcharge(surcharge > 0 ? 0 : 20000)}
                      className={`surcharge-btn ${
                        surcharge > 0 ? "active" : ""
                      }`}
                    >
                      <span className="surcharge-icon">💰</span>
                      <span className="surcharge-text">
                        Phụ thu 20k
                        {surcharge > 0 && " ✓"}
                      </span>
                    </button>
                  </div>
                )}

                {/* Phần thanh toán */}
                <div className="payment-section">
                  {cart.length > 0 ? (
                    <>
                      {/* Tổng tiền */}
                      <div className="total-container">
                        <div className="total-row items-count">
                          <span className="label">Tổng số món</span>
                          <span className="value">
                            {cart.reduce((sum, item) => sum + item.quantity, 0)}
                          </span>
                        </div>
                        {surcharge > 0 && (
                          <div className="total-row surcharge-row">
                            <span className="label">Phụ thu</span>
                            <span className="value">
                              {formatCurrency(surcharge)}
                            </span>
                          </div>
                        )}
                        <div className="total-row grand-total">
                          <span className="label">TỔNG TIỀN</span>
                          <span className="value">{formatCurrency(total)}</span>
                        </div>
                      </div>

                      {/* Form thanh toán */}
                      <div className="payment-form">
                        <h3 className="payment-form-title">💳 Thanh toán</h3>
                        <div className="payment-input-group">
                          <label className="payment-label">Số bàn *</label>
                          <input
                            type="text"
                            value={tableNumber}
                            onChange={(e) => setTableNumber(e.target.value)}
                            onFocus={() => handleInputFocus("table")}
                            className="payment-input"
                            placeholder="Nhập số bàn"
                            readOnly
                          />
                        </div>

                        <div className="payment-input-group">
                          <label className="payment-label">Vị trí bàn *</label>
                          <div className="location-buttons">
                            <button
                              type="button"
                              onClick={() => setTableLocation("phía trước")}
                              className={`location-btn ${
                                tableLocation === "phía trước" ? "active" : ""
                              }`}
                            >
                              📍 Phía trước
                            </button>
                            <button
                              type="button"
                              onClick={() => setTableLocation("phía sau")}
                              className={`location-btn ${
                                tableLocation === "phía sau" ? "active" : ""
                              }`}
                            >
                              📍 Phía sau
                            </button>
                            <button
                              type="button"
                              onClick={() => setTableLocation("võng trong nhà")}
                              className={`location-btn ${
                                tableLocation === "võng trong nhà"
                                  ? "active"
                                  : ""
                              }`}
                            >
                              🏠 Võng trong nhà
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setTableLocation("võng ngoài trời")
                              }
                              className={`location-btn ${
                                tableLocation === "võng ngoài trời"
                                  ? "active"
                                  : ""
                              }`}
                            >
                              🌳 Võng ngoài trời
                            </button>
                          </div>
                        </div>

                        <div className="payment-input-group">
                          <label className="payment-label">
                            Tiền khách đưa *
                          </label>
                          <input
                            type="text"
                            value={displayPaid}
                            onChange={handlePaidChange}
                            onFocus={() => handleInputFocus("paid")}
                            className="payment-input"
                            placeholder="Nhập số tiền"
                            readOnly
                          />
                        </div>

                        {paidAmount > 0 && (
                          <div
                            className={`change-display ${
                              paidAmount < total ? "insufficient" : "sufficient"
                            }`}
                          >
                            <div className="change-row">
                              <span
                                className={`label ${
                                  paidAmount < total
                                    ? "insufficient"
                                    : "sufficient"
                                }`}
                              >
                                {paidAmount < total
                                  ? "⚠️ Còn thiếu"
                                  : "✅ Tiền thối"}
                              </span>
                              <span
                                className={`value ${
                                  paidAmount < total
                                    ? "insufficient"
                                    : "sufficient"
                                }`}
                              >
                                {formatCurrency(Math.abs(changeAmount))}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Nút in */}
                      <button
                        onClick={printReceipt}
                        disabled={
                          !tableNumber ||
                          !tableLocation ||
                          !customerPaid ||
                          parseFloat(customerPaid) < total
                        }
                        className="print-btn"
                      >
                        <Printer size={32} />
                        <span>IN PHIẾU BÁN HÀNG</span>
                      </button>

                      {(!tableNumber ||
                        !tableLocation ||
                        !customerPaid ||
                        parseFloat(customerPaid) < total) && (
                        <div className="warning-message">
                          {!tableNumber || !tableLocation || !customerPaid
                            ? "⚠️ Vui lòng nhập số bàn, chọn vị trí và nhập tiền khách đưa"
                            : "⚠️ Tiền khách đưa phải ≥ tổng tiền"}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="empty-payment">
                      <div className="empty-payment-icon">💳</div>
                      <p className="empty-payment-text">
                        Thêm món để thanh toán
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Options Modal */}
      {showOptionsModal && selectedItem && (
        <div className="options-modal-overlay">
          <div className="options-modal">
            <div className="options-modal-header">
              <h3 className="options-modal-title">{selectedItem.name}</h3>
              <button
                onClick={() => setShowOptionsModal(false)}
                className="options-modal-close"
              >
                <X size={24} />
              </button>
            </div>

            <div>
              {selectedItem.hasPriceOptions && (
                <div className="options-section">
                  <label className="options-label">Chọn mức giá:</label>
                  <div className="temperature-buttons">
                    <button
                      onClick={() =>
                        setTempOptions({ ...tempOptions, priceOption: "base" })
                      }
                      className={`temp-btn ${
                        tempOptions.priceOption === "base" ? "active" : ""
                      }`}
                      style={{
                        background:
                          tempOptions.priceOption === "base"
                            ? "#10b981"
                            : "#d1fae5",
                        color:
                          tempOptions.priceOption === "base"
                            ? "white"
                            : "#065f46",
                      }}
                    >
                      💵 {selectedItem.price.toLocaleString("vi-VN")}đ
                    </button>
                    <button
                      onClick={() =>
                        setTempOptions({ ...tempOptions, priceOption: "max" })
                      }
                      className={`temp-btn ${
                        tempOptions.priceOption === "max" ? "active" : ""
                      }`}
                      style={{
                        background:
                          tempOptions.priceOption === "max"
                            ? "#f59e0b"
                            : "#fef3c7",
                        color:
                          tempOptions.priceOption === "max"
                            ? "white"
                            : "#92400e",
                      }}
                    >
                      💰 {selectedItem.maxPrice.toLocaleString("vi-VN")}đ
                    </button>
                  </div>
                </div>
              )}

              <div className="options-section">
                <label className="options-label">Tùy chọn thêm:</label>
                <div className="options-checkboxes">
                  {selectedItem.hasTemp && (
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={tempOptions.isHot}
                        onChange={(e) =>
                          setTempOptions({
                            ...tempOptions,
                            isHot: e.target.checked,
                          })
                        }
                        className="checkbox-input"
                      />
                      <span className="checkbox-text">🔥 Nóng</span>
                    </label>
                  )}
                  {selectedItem.hasCoffeeOptions && (
                    <>
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={tempOptions.coffeeLevel === "more-milk"}
                          onChange={(e) =>
                            setTempOptions({
                              ...tempOptions,
                              coffeeLevel: e.target.checked
                                ? "more-milk"
                                : "normal",
                            })
                          }
                          className="checkbox-input"
                        />
                        <span className="checkbox-text">🥛 Nhiều sữa</span>
                      </label>
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={tempOptions.coffeeLevel === "less-milk"}
                          onChange={(e) =>
                            setTempOptions({
                              ...tempOptions,
                              coffeeLevel: e.target.checked
                                ? "less-milk"
                                : "normal",
                            })
                          }
                          className="checkbox-input"
                        />
                        <span className="checkbox-text">🥛 Ít sữa</span>
                      </label>
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={tempOptions.coffeeLevel === "more-coffee"}
                          onChange={(e) =>
                            setTempOptions({
                              ...tempOptions,
                              coffeeLevel: e.target.checked
                                ? "more-coffee"
                                : "normal",
                            })
                          }
                          className="checkbox-input"
                        />
                        <span className="checkbox-text">☕ Cafe nhiều</span>
                      </label>
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={tempOptions.coffeeLevel === "less-coffee"}
                          onChange={(e) =>
                            setTempOptions({
                              ...tempOptions,
                              coffeeLevel: e.target.checked
                                ? "less-coffee"
                                : "normal",
                            })
                          }
                          className="checkbox-input"
                        />
                        <span className="checkbox-text">☕ Cafe ít</span>
                      </label>
                    </>
                  )}
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={tempOptions.lessSweet}
                      onChange={(e) =>
                        setTempOptions({
                          ...tempOptions,
                          lessSweet: e.target.checked,
                        })
                      }
                      className="checkbox-input"
                    />
                    <span className="checkbox-text">🍬 Ít ngọt</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={tempOptions.lessIce}
                      onChange={(e) =>
                        setTempOptions({
                          ...tempOptions,
                          lessIce: e.target.checked,
                        })
                      }
                      className="checkbox-input"
                    />
                    <span className="checkbox-text">🧊 Ít đá</span>
                  </label>
                  {selectedItem.hasNoSugar && (
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={tempOptions.noSweet}
                        onChange={(e) =>
                          setTempOptions({
                            ...tempOptions,
                            noSweet: e.target.checked,
                          })
                        }
                        className="checkbox-input"
                      />
                      <span className="checkbox-text">🚫 Không đường</span>
                    </label>
                  )}
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button
                onClick={() => setShowOptionsModal(false)}
                className="modal-btn cancel"
              >
                Hủy
              </button>
              <button onClick={confirmAddToCart} className="modal-btn confirm">
                Thêm vào giỏ
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Virtual Keyboard */}
      {showKeyboard && (
        <div className="keyboard-overlay">
          <div
            className={`keyboard-container ${
              activeInput === "search" && searchSuggestions.length > 0
                ? "with-suggestions"
                : ""
            }`}
          >
            <div
              className="keyboard-modal"
              style={{ maxWidth: activeInput === "search" ? "600px" : "400px" }}
            >
              <div className="keyboard-header">
                <h3 className="keyboard-title">
                  {activeInput === "table"
                    ? "Nhập số bàn"
                    : activeInput === "paid"
                    ? "Nhập tiền khách đưa"
                    : "Tìm kiếm món"}
                </h3>
                <button
                  onClick={handleKeyboardClose}
                  className="keyboard-close"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="keyboard-display">
                {activeInput === "table"
                  ? tableNumber || "0"
                  : activeInput === "paid"
                  ? displayPaid || "0đ"
                  : searchTerm || "Nhập tên món..."}
              </div>

              {activeInput === "search" ? (
                // Bàn phím chữ cái
                <div className="keyboard-grid-alpha">
                  {[
                    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
                    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
                    ["z", "x", "c", "v", "b", "n", "m"],
                  ].map((row, rowIndex) => (
                    <div key={rowIndex} className="keyboard-row">
                      {row.map((letter) => (
                        <button
                          key={letter}
                          onClick={() => handleKeyboardClick(letter)}
                          className="keyboard-btn letter"
                        >
                          {letter.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  ))}
                  <div className="keyboard-row">
                    <button
                      onClick={() => handleKeyboardClick("clear")}
                      className="keyboard-btn clear"
                    >
                      XÓA HẾT
                    </button>
                    <button
                      onClick={() => handleKeyboardClick("space")}
                      className="keyboard-btn space"
                    >
                      SPACE
                    </button>
                    <button
                      onClick={() => handleKeyboardClick("backspace")}
                      className="keyboard-btn backspace"
                    >
                      ⌫
                    </button>
                  </div>
                </div>
              ) : (
                // Bàn phím số
                <div className="keyboard-grid">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleKeyboardClick(num.toString())}
                      className="keyboard-btn number"
                    >
                      {num}
                    </button>
                  ))}
                  <button
                    onClick={() => handleKeyboardClick("clear")}
                    className="keyboard-btn clear"
                  >
                    C
                  </button>
                  <button
                    onClick={() => handleKeyboardClick("0")}
                    className="keyboard-btn number"
                  >
                    0
                  </button>
                  <button
                    onClick={() => handleKeyboardClick("backspace")}
                    className="keyboard-btn backspace"
                  >
                    ⌫
                  </button>
                </div>
              )}

              <button onClick={handleKeyboardClose} className="keyboard-done">
                ✓ Xong
              </button>
            </div>

            {/* Panel gợi ý món - chỉ hiện khi search */}
            {activeInput === "search" && searchSuggestions.length > 0 && (
              <div className="suggestions-panel">
                <div className="suggestions-header">
                  <h3 className="suggestions-title">
                    Gợi ý món ({searchSuggestions.length})
                  </h3>
                </div>
                <div className="suggestions-list">
                  {searchSuggestions.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSelectSuggestion(item)}
                      className="suggestion-item"
                    >
                      <div className="suggestion-name">{item.name}</div>
                      <div className="suggestion-price">
                        {item.maxPrice
                          ? `${formatCurrency(item.price)} - ${formatCurrency(
                              item.maxPrice
                            )}`
                          : formatCurrency(item.price)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          )
        </div>
      )}
      ;
    </div>
  );
};
export default CafePOS;
