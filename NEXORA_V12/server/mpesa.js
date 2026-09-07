const https = require("https");

function request(host, path, method, headers, body) {
  return new Promise((resolve, reject) => {
    const req = https.request({ host, path, method, headers }, res => {
      let data = "";
      res.on("data", c => data += c);
      res.on("end", () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(data || "{}") }); }
        catch { resolve({ status: res.statusCode, data }); }
      });
    });
    req.on("error", reject);
    req.write(body || "");
    req.end();
  });
}

async function getToken() {
  const key = process.env.MPESA_CONSUMER_KEY;
  const secret = process.env.MPESA_CONSUMER_SECRET;
  if (!key || !secret) throw new Error("M-Pesa credentials are not configured");
  const auth = Buffer.from(`${key}:${secret}`).toString("base64");
  const host = process.env.MPESA_ENV === "production" ? "api.safaricom.co.ke" : "sandbox.safaricom.co.ke";
  const r = await request(host, "/oauth/v1/generate?grant_type=client_credentials", "GET",
    { Authorization: `Basic ${auth}` }, "");
  if (!r.data.access_token) throw new Error("Unable to obtain M-Pesa access token");
  return r.data.access_token;
}

async function stkPush(phone, amount, accountRef) {
  const required = ["MPESA_SHORTCODE", "MPESA_PASSKEY", "MPESA_CALLBACK_URL"];
  if (required.some(k => !process.env[k])) throw new Error("M-Pesa STK settings are not configured");
  const token = await getToken();
  const timestamp = new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 14);
  const password = Buffer.from(`${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`).toString("base64");
  const host = process.env.MPESA_ENV === "production" ? "api.safaricom.co.ke" : "sandbox.safaricom.co.ke";
  const body = JSON.stringify({
    BusinessShortCode: process.env.MPESA_SHORTCODE,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: Number(amount),
    PartyA: phone,
    PartyB: process.env.MPESA_SHORTCODE,
    PhoneNumber: phone,
    CallBackURL: process.env.MPESA_CALLBACK_URL,
    AccountReference: accountRef,
    TransactionDesc: "NEXORA Premium"
  });
  const r = await request(host, "/mpesa/stkpush/v1/processrequest", "POST", {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(body)
  }, body);
  return r.data;
}

module.exports = { stkPush };
