import { CartItem } from "@/types";
import { WHATSAPP_NUMBER, MPESA_NUMBER } from "@/lib/constants";
import { getCartTotal } from "@/lib/cart";

function formatPrice(price: number): string {
  return `KSh ${price.toLocaleString("en-KE")}`;
}

export function buildWhatsAppURL(
  items: CartItem[],
  customerName: string,
  deliveryArea: string
): string {
  const lines = items.map(
    (item) =>
      `${item.quantity}x ${item.product.name} - ${formatPrice(item.product.price * item.quantity)}`
  );

  const total = getCartTotal(items);

  const message = `🛍️ New Order — Elegancybyabby

Customer: ${customerName}
Delivery Area: ${deliveryArea}

${lines.join("\n")}

Total: ${formatPrice(total)}

💳 Pay via M-Pesa:
Pochi la Biashara / Lipa na M-Pesa
Number: ${MPESA_NUMBER}`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
