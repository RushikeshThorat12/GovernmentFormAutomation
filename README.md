# Gov  Automatic Form Filler & Validator with custom trained LLMS , CNN Roboflow models , OCR , Google Vision API ( Problem statemnet 8 Front End Hunt)


https://github.com/user-attachments/assets/59cf1d96-f589-4ecd-b8dd-beab8fe35a4c



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


![WhatsApp Image 2025-07-06 at 17 54 36_097bfa5f](https://github.com/user-attachments/assets/ba1ce500-6597-454a-b698-c9770d315606)
![image](https://github.com/user-attachments/assets/96c0e172-88b1-4dc8-a143-bebd78c9b11c)
![image](https://github.com/user-attachments/assets/8f1062e4-3186-4690-8021-72270e80dc53)
![image](https://github.com/user-attachments/assets/3614f301-9906-4b04-88d4-85067f881f7e)



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
