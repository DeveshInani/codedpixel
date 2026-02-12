from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from dotenv import load_dotenv, dotenv_values
import os

# Load environment variables using absolute path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# Load environment variables from project root
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# Check for .env in current dir first, then parent dir (root)
DOTENV_PATH = os.path.join(BASE_DIR, ".env")
if not os.path.exists(DOTENV_PATH):
    DOTENV_PATH = os.path.join(os.path.dirname(BASE_DIR), ".env")
load_dotenv(DOTENV_PATH, override=True)

app = FastAPI()

# Secure CORS origins
allowed_origins_raw = os.getenv("ALLOWED_ORIGINS", "*")
allowed_origins = [o.strip() for o in allowed_origins_raw.split(",")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def health_check():
    return {"status": "active", "message": "Portfolio Backend is running"}

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

def get_mail_conf():
    return ConnectionConfig(
        MAIL_USERNAME = os.getenv("MAIL_USERNAME", ""),
        MAIL_PASSWORD = os.getenv("MAIL_PASSWORD", ""),
        MAIL_FROM = os.getenv("MAIL_FROM", ""),
        MAIL_PORT = int(os.getenv("MAIL_PORT", 587)),
        MAIL_SERVER = os.getenv("MAIL_SERVER", ""),
        MAIL_FROM_NAME = os.getenv("MAIL_FROM_NAME", "Portfolio_Contact"),
        MAIL_STARTTLS = os.getenv("MAIL_STARTTLS", "True").lower() == "true",
        MAIL_SSL_TLS = os.getenv("MAIL_SSL_TLS", "False").lower() == "true",
        USE_CREDENTIALS = True,
        VALIDATE_CERTS = True
    )

@app.post("/send-email")
async def send_contact_email(form: ContactForm):
    # Reload env vars to pick up changes without restart
    env_vars = {**dotenv_values(DOTENV_PATH), **os.environ}
    
    test_mode = str(env_vars.get("TEST_MODE", "false")).lower().strip() == "true"
    username = env_vars.get("MAIL_USERNAME", "")
    password = env_vars.get("MAIL_PASSWORD", "")
    
    # Check for placeholders or explicit test mode
    is_test_active = test_mode or \
                    not username or \
                    "your_email" in username or \
                    "xxxx" in password or \
                    password == "Devesh@839"

    if is_test_active:
        print("\n" + ">>>" * 15)
        print("TEST MODE: Email Logged to Terminal")
        print(f"From: {form.email} ({form.name})")
        print(f"Subject: {form.subject}")
        print(f"Message: {form.message}")
        print("<<<" * 15 + "\n")
        return {"message": "Test mode active: Email logged to terminal."}

    # Real Email Path
    try:
        conf = get_mail_conf()
        html = f"""
        <h3>New Contact Message from Portfolio</h3>
        <p><b>Name:</b> {form.name}</p>
        <p><b>Email:</b> {form.email}</p>
        <p><b>Subject:</b> {form.subject}</p>
        <p><b>Message:</b></p>
        <p>{form.message}</p>
        """

        message = MessageSchema(
            subject=f"Portfolio Contact: {form.subject}",
            recipients=[os.getenv("MAIL_FROM")],
            body=html,
            subtype=MessageType.html
        )

        fm = FastMail(conf)
        await fm.send_message(message)
        return {"message": "Email has been sent"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    # Use PORT environment variable for Render
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
