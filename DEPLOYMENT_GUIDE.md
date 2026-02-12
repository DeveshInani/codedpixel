# 🚀 Hosting your Portfolio: Step-by-Step Guide

Since you're new to hosting, here is exactly how to put your project live on the internet! 

## Part 1: Host the Backend (Render)
Render will run your Python code.

1. **Sign Up**: Go to [Render.com](https://render.com) and sign up with your GitHub account.
2. **New Web Service**: Click **New +** > **Web Service**.
3. **Connect Repo**: Select your `codedpixel` repository.
4. **Settings**:
   - **Name**: `portfolio-backend`
   - **Root Directory**: `backend`  <-- **CRITICAL: Set this to "backend"**
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. **Environment Variables**: Click the **Environment** tab and add:
   - `MAIL_USERNAME`: (Your email)
   - `MAIL_PASSWORD`: (Your Gmail App Password)
   - `MAIL_FROM`: (Your email)
   - `MAIL_PORT`: `587` (If this times out, use `465`)
   - `MAIL_SERVER`: `smtp.gmail.com`
   - `MAIL_STARTTLS`: `True` (If using port 465, set to `False`)
   - `MAIL_SSL_TLS`: `False` (If using port 465, set to `True`)
   - `ALLOWED_ORIGINS`: `*`
6. **Deploy**: Click **Create Web Service**. Wait for it to build. Once done, copy the URL Render gives you (e.g., `https://portfolio-backend.onrender.com`).

---

## Part 2: Host the Frontend (Vercel)
Vercel will host your React interface.

1. **Sign Up**: Go to [Vercel.com](https://vercel.com) and sign up with GitHub.
2. **Add New**: Click **Add New** > **Project**.
3. **Import**: Find your `codedpixel` repo and click **Import**.
4. **Settings**:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Leave as default (root)
5. **Environment Variables**: Open the **Environment Variables** section and add:
   - **Key**: `VITE_API_URL`
   - **Value**: (Paste the Render URL you copied in Part 1)
6. **Deploy**: Click **Deploy**. Vercel will build your site and give you a public link!

---

## 🛠️ Important Notes
- **Cold Boot**: Since Render is free, your backend will "sleep" after 15 minutes of no work. The first time you send an email after a break, it might take 30 seconds to wake up. This is normal for free hosting!
- **Gmail Security**: Make sure you are using an **App Password**, not your regular Gmail password. 
- **ModuleNotFoundError**: If Render says a module like `resend` is missing, go to the **Events** tab or the **Deploy** menu and select **Manual Deploy** > **Clear Build Cache & Deploy**. This forces Render to reinstall everything from scratch.
- **Auto-Updates**: Every time you push new code to your GitHub `main` branch, both Vercel and Render will automatically update your site.

**You are now a Web Developer! 🥂**
