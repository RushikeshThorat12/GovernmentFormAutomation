#  Government   Automatic Form Filler & Validator with custom trained LLMS , CNN Roboflow models , OCR , Google Vision API 






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
![image](https://github.com/user-attachments/assets/dbbfac83-4439-469f-96c8-0cca52e20d79)
![image](https://github.com/user-attachments/assets/3402a584-0afe-48f3-8e63-8f94d7a98f92)
![image](https://github.com/user-attachments/assets/fa861678-9490-4e5a-9d6e-22afd9f75040)
![image](https://github.com/user-attachments/assets/0e1a2ee7-68b8-406b-ae7c-da3c5fd14620)
![image](https://github.com/user-attachments/assets/e8eb1652-e143-4917-8c5b-071f0ac6b6a5)
![image](https://github.com/user-attachments/assets/84234417-9868-4081-8266-4e5bcbe54644)
![image](https://github.com/user-attachments/assets/5670e325-062c-4e7a-b7b8-a4e83dee7f3c)
![image](https://github.com/user-attachments/assets/ebf6c0a9-99d5-4e71-ab39-80726c89c0cd)








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
