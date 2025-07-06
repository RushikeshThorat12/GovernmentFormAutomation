# Gov  Automatic Form Filler & Validator with custom trained LLMS , CNN Roboflow models , OCR , Google Vision API 
( Problem statemnet 8 Front End Hunt)

*Automatically detect, extract, validate, and fill out any government form—Aadhaar, PAN, etc.—with just a few clicks.*



## Problem Statement
> INdian citizens spends 300 rupees even for  small adhar updates and routine updates  up to ₹1,500 under schemes like Ladki Bahin Yojana—driven by agent mark‑ups.  
> Complex, multi‑page government forms with unfamiliar fields deter even experienced users and breed confusion.  
> Reliance on middlemen introduces fraud risks—excessive fees, counterfeit returns—and manual entry errors that undermine data integrity.  
> The entire process can stretch from 2–3 hours of manual filling through repeated verifications to delays of up to 25 days in urgent cases.

---

## Features
- **Automatic Document Detection** (Aadhaar, PAN, etc.) via YOLOv5 + CNN  
- **Region‑of‑Interest Selection** using a React‑powered annotation tool  
- **OCR‑Powered Text Extraction** (Google AI Docs API + custom pipelines)  
- **Fine‑Tuned LLM  Validation** Finetunned LLAMA-3 
- **Secure Form Filling** only after successful validation  
- **User Authentication** with sign‑up / login flows  
- **MongoDB Storage** for submitted form data  

---

## Tech Stack
- **Backend:** Flask  
- **Frontend:** React  
- **ML Models:**  
  - YOLOv5 (text detection)  
  - Custom fine‑tuned RRM on Hugging Face (validation)  
- **OCR:** Google AI Docs API + custom OCR pipelines  
- **Database:** MongoDB  
- **Deployment:** (e.g., Heroku / AWS / Docker)

---

## Getting Started

1. **Clone the repo**  
   ```bash
   git clone https://github.com/RushikeshThorat12/GovernmentFormAutomation.git
   cd GovernmentFormAutomation
