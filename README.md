# 🧠 GPTLab

A lightweight **ChatGPT clone** powered by OpenAI's **gpt-4o-mini** model.  
GPTLab brings a familiar conversational interface with essential features like new chats, chat history tracking, and easy message retrieval — all built using a frontend-backend architecture.

---

## 🚀 Features

- 💬 **New Chat Creation** – Instantly start a new conversation
- 🕓 **Persistent Chat History** – Automatically tracks and stores previous chats
- 📂 **Access Old Chats** – Easily revisit and continue any conversation
- ❌ **Delete Conversations** – Remove past chats when no longer needed
- 🔁 **Frontend ↔ Backend API Calls** – Clean separation between client and server
- 🤖 **OpenAI gpt-4o-mini Integration** – Fast and smart responses via OpenAI API

---

## 🧱 Tech Stack

| Layer        | Tech                             |
|--------------|----------------------------------|
| Frontend     | React (or your chosen framework) |
| Backend      | Node.js / Express (or your stack)|
| AI Model     | OpenAI `gpt-4o-mini` (via API)   |
| API Provider | [OpenAI Platform](https://platform.openai.com/) |
| Auth         | No auth                          |
| Storage      | In-memory / local storage / DB (specify) |

---

## 🔑 OpenAI Setup

This app uses the **`gpt-4o-mini`** model from OpenAI, which requires a valid API key.

> 💵 **Note:** I’ve subscribed to the OpenAI API with a `$10 plan` to access `gpt-4o-mini`.

To use the API:

1. Sign up at [https://platform.openai.com](https://platform.openai.com)
2. Create a new API key
3. Store the key in a `.env` file in your backend:

