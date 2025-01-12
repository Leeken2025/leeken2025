// 通用平滑滚动函数
function smoothScrollTo(targetId) {
  const targetElement = document.getElementById(targetId); // 定位目标元素
  const header = document.querySelector('header'); // 获取固定的 header

  if (targetElement) {
    // 获取 header 高度
    const headerHeight = header ? header.offsetHeight : 0;

    // 增加额外的视觉偏移间距（例如 10px）
    const offsetPadding = 20;

    // 计算最终滚动位置
    const targetPosition =
      targetElement.getBoundingClientRect().top +
      window.pageYOffset -
      headerHeight -
      offsetPadding; // 减去 header 高度和额外间距

    // 平滑滚动到目标位置
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth', // 平滑滚动
    });
  }
}

// 统一处理所有带有 `data-target` 属性的元素
document.querySelectorAll('[data-target]').forEach(element => {
  element.addEventListener('click', function () {
    const targetId = this.getAttribute('data-target'); // 获取目标 ID
    if (targetId) {
      smoothScrollTo(targetId);
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.elementor-menu-toggle');
  const dropdownMenu = document.querySelector('.elementor-nav-menu--dropdown');

  // 点击菜单按钮，切换菜单状态
  menuToggle.addEventListener('click', function () {
      menuToggle.classList.toggle('elementor-active');

      // 获取页面宽度
      const pageWidth = document.documentElement.clientWidth || window.innerWidth;

      // 动态计算菜单宽度
      const menuWidth = pageWidth;

      // 动态计算菜单的 left 值
      const leftPosition = -((menuWidth - 30) / 2); // 调整偏移量为实际需求

      // 计算 top 值
      const menuToggleRect = menuToggle.getBoundingClientRect(); // 获取按钮的位置信息
      const topPosition = menuToggleRect.top + 10; // 按钮底部 + 10px

      // 设置菜单的动态样式
      dropdownMenu.style.width = `${menuWidth}px`;
      dropdownMenu.style.left = `${leftPosition}px`;
      dropdownMenu.style.top = `${topPosition}px`;
  });

    // 点击菜单内部的链接，还原菜单状态
    dropdownMenu.addEventListener('click', function (event) {
      if (event.target.tagName.toLowerCase() === 'a') {
          // 仅移除 .elementor-active 类
          menuToggle.classList.remove('elementor-active');

          // 不清除 style 保留动态样式
          console.log("Menu link clicked, menu state restored, but styles remain intact.");
      }
  });
});


//toast
class Toast {
  constructor() {
    this.toastContainer = null;
    this.init();
  }

  init() {
    // 创建 Toast 容器
    this.toastContainer = document.createElement("div");
    this.toastContainer.id = "toast-container";
    this.toastContainer.style.position = "fixed";
    this.toastContainer.style.top = "50%";
    this.toastContainer.style.left = "50%";
    this.toastContainer.style.transform = "translate(-50%, -50%)";
    this.toastContainer.style.zIndex = "1000";
    this.toastContainer.style.display = "flex";
    this.toastContainer.style.flexDirection = "column";
    this.toastContainer.style.alignItems = "center";
    document.body.appendChild(this.toastContainer);
  }

  show(type, message, timeout = 2000) {
    // 创建 Toast 元素
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.style.position = "relative";
    toast.style.marginBottom = "10px";
    toast.style.padding = "15px 20px";
    toast.style.borderRadius = "5px";
    toast.style.background = this.getBackgroundColor(type);
    toast.style.color = "#fff";
    toast.style.boxShadow = "0 2px 5px rgba(0,0,0,0.3)";
    toast.style.display = "flex";
    toast.style.alignItems = "center";
    toast.style.animation = "open 0.3s ease forwards";
    toast.style.minWidth = "300px";
    toast.style.justifyContent = "space-between";

    // 添加图标
    const icon = document.createElement("div");
    icon.style.width = "20px";
    icon.style.height = "20px";
    icon.style.marginRight = "10px";
    icon.style.borderRadius = "50%";
    icon.style.background = "#fff";
    toast.appendChild(icon);

    // 添加消息内容
    const text = document.createElement("div");
    text.textContent = message;
    text.style.flex = "1";
    toast.appendChild(text);

    // 添加关闭按钮
    const closeButton = document.createElement("button");
    closeButton.textContent = "✕";
    closeButton.style.border = "none";
    closeButton.style.background = "transparent";
    closeButton.style.color = "#fff";
    closeButton.style.cursor = "pointer";
    closeButton.style.fontSize = "16px";
    closeButton.onclick = () => this.close(toast);
    toast.appendChild(closeButton);

    // 自动关闭
    setTimeout(() => {
      this.close(toast);
    }, timeout);

    this.toastContainer.appendChild(toast);
  }

  close(toast) {
    toast.style.animation = "close 0.3s ease forwards";
    setTimeout(() => {
      toast.remove();
    }, 300);
  }

  getBackgroundColor(type) {
    switch (type) {
      case "success":
        return "#28a745";
      case "warning":
        return "#ffc107";
      case "error":
        return "#dc3545";
      case "info":
        return "#17a2b8";
      default:
        return "#343a40";
    }
  }

  success(message, timeout) {
    this.show("success", message, timeout);
  }

  warning(message, timeout) {
    this.show("warning", message, timeout);
  }

  error(message, timeout) {
    this.show("error", message, timeout);
  }

  info(message, timeout) {
    this.show("info", message, timeout);
  }
}

// 使用示例
const toast = new Toast();

// 使用不同类型的 Toast
// toast.success("Operation successful!", 3000);
// toast.warning("This is a warning!", 4000);
// toast.error("An error occurred!", 5000);
// toast.info("This is an informational message!");


// Disable right-click
  document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
  });

  // Disable F12 and Ctrl+Shift+I
  document.addEventListener('keydown', function(event) {
    if (event.key === 'F12' || 
        (event.ctrlKey && event.shiftKey && event.key === 'I')) {
      event.preventDefault();
    }
  });