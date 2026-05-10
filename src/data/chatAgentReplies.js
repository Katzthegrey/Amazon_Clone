// Cursor code: scripted “agent” replies — keywords in `triggers` are matched against the user’s message (lowercased substring match). First matching rule wins.

export const DEFAULT_CHAT_REPLY =
  "Thanks for reaching out — this is a demo assistant. Mention delivery, orders, cart, returns, refunds, passwords, Prime, categories, scams, unsubscribe, or try help for a cheat sheet.";

const HELP_HINT =
  "Try asking about: hello, order tracking, cancel, return & refund, delivery, cart & checkout, Prime, password & sign-in, invoice, scams, unsubscribing from emails, dark mode, categories, jokes, or shortcuts.";

export const chatReplyRules = [
  {
    triggers: ["help", "what can you do", "assist"],
    reply: HELP_HINT,
  },
  {
    triggers: ["hi", "hello", "hey", "good morning", "good afternoon", "evening"],
    reply: "Hi — I’m here to mimic support for Amazon.co.za demo. Browse categories from the bar, use search at the top, or open Cart for checkout.",
  },
  {
    triggers: ["bye", "goodbye", "see you"],
    reply: "Goodbye — happy shopping!",
  },
  {
    triggers: ["thanks", "thank you", "thx"],
    reply: "You're welcome!",
  },
  {
    triggers: ["order", "track", "shipping", "where is my parcel", "dispatch"],
    reply: "For this clone, orders are not stored on a server. After checkout (demo), use your email confirmation in a real store — here you can explore the Cart page to review items.",
  },
  {
    triggers: ["cancel", "cancel order"],
    reply: "Cancellations usually work from Your Orders while the item hasn’t shipped. This demo has no live order API — use Cart to remove items before checkout.",
  },
  {
    triggers: ["return", "refund", "send back"],
    reply: "Returns & refunds: go to Returns in the nav (sign in), pick the item, and print a label if eligible. This build is front-end only, so it’s for UI practice.",
  },
  {
    triggers: ["delivery", "how long", "when will", "eta"],
    reply: "Standard delivery is often 2–5 business days in major areas; remote areas can take longer. Exact dates show at checkout in a real Amazon flow.",
  },
  {
    triggers: ["cart", "basket", "checkout"],
    reply: "Open the cart icon top-right to change quantities or remove items. Proceed to checkout when you’re ready (demo only).",
  },
  {
    triggers: ["password", "sign in", "login", "account locked"],
    reply: "Use Hello, Sign in → enter email and password. Forgot password isn’t wired in this demo — use the test account from your developers if one exists.",
  },
  {
    triggers: ["prime", "membership", "subscribe"],
    reply: "Prime-style benefits (fast shipping, video) are brand cues only in this clone — no real subscription here.",
  },
  {
    triggers: ["price", "cost", "discount", "deal", "sale"],
    reply: "Prices on product cards come from the local catalog. Filters on category pages help narrow by price range.",
  },
  {
    triggers: ["category", "browse", "electronics", "fashion", "kitchen"],
    reply: "Use the category strip under the header or open a department from the home page tiles to see filtered products.",
  },
  {
    triggers: ["dark mode", "light mode", "theme"],
    reply: "Use the sun/moon toggle in the top bar to switch app theme — it saves in your browser.",
  },
  {
    triggers: ["invoice", "receipt", "vat"],
    reply: "After a real purchase, invoices appear in Order details. This sandbox doesn’t email receipts.",
  },
  {
    triggers: ["complaint", "problem", "damaged", "wrong item"],
    reply: "For wrong or damaged goods, start a return from Your Orders — or contact Seller Support from the order page.",
  },
  {
    triggers: ["scam", "phishing", "fake email", "spoof"],
    reply: "Amazon won’t ask for passwords or OTPs by surprise link. Report suspicious emails to Amazon’s spoofing address and don’t enter details.",
  },
  {
    triggers: ["unsubscribe", "spam", "emails"],
    reply: "In a live account you’d manage communication preferences under Account settings → Email alerts.",
  },
  {
    triggers: ["joke", "funny"],
    reply: "Why did the shopping cart blush? …It saw the checkout!",
  },
  {
    triggers: ["tip", "shortcut"],
    reply: "Tip: Ctrl+K (or Cmd+K on Mac) focuses the search box in this layout — try it.",
  },
];

export function pickAgentReply(prompt) {
  const q = prompt.toLowerCase().trim().replace(/\s+/g, " ");
  if (!q) {
    return "Type a message and press Send — I’ll match keywords like delivery, cart, or return.";
  }
  for (const rule of chatReplyRules) {
    const hit = rule.triggers.some((t) => q.includes(t));
    if (hit) {
      return typeof rule.reply === "function" ? rule.reply(q) : rule.reply;
    }
  }
  return DEFAULT_CHAT_REPLY;
}
