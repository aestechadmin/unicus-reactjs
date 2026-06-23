// src/utils/toastService.js
import toast from "react-hot-toast";

const options = {
  duration: 4000, // 4 seconds
  style: {
    borderRadius: "10px",
    padding: "12px 16px",
    fontWeight: 500,
    fontSize: "15px",
  },
};

const toastService = {
  success: (msg) => toast.success(msg, { ...options, icon: "✅" }),
  error: (msg) => toast.error(msg, { ...options, icon: "❌" }),
  warning: (msg) => toast(msg, { ...options, icon: "⚠️", style: { ...options.style, background: "#FFF3CD", color: "#856404" } }),
  info: (msg) => toast(msg, { ...options, icon: "ℹ️", style: { ...options.style, background: "#D1ECF1", color: "#0C5460" } }),
};

export default toastService;