<div align="center">
  <img src="frontend/src/app/favicon.ico" alt="Logo" width="100" height="100">
  <h1 align="center">Skin Disease Prediction Using Machine Learning 🔬🧑‍⚕️</h1>

  <p align="center">
    <strong>A full-stack healthcare AI application to predict skin diseases with high accuracy based on 34 clinical and histopathological features.</strong>
    <br />
    <br />
    <a href="https://github.com/Raghuvaranlokati/skin_disease_model"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="#">View Demo</a>
    ·
    <a href="https://github.com/Raghuvaranlokati/skin_disease_model/issues">Report Bug</a>
    ·
    <a href="https://github.com/Raghuvaranlokati/skin_disease_model/issues">Request Feature</a>
  </p>
  
  <div>
    <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
    <img src="https://img.shields.io/badge/scikit--learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white" alt="Scikit-Learn" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Hugging%20Face-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black" alt="Hugging Face Space" />
    <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
  </div>
</div>

<br />

## 🌟 Overview

**Skin Disease Prediction AI** is an advanced, production-ready full-stack web application designed to assist medical professionals and individuals in diagnosing skin conditions. By leveraging a trained Machine Learning model on **34 distinct patient features** (including clinical symptoms and histopathological data), the system accurately predicts among 6 major skin disease classes:

1. **Psoriasis**
2. **Seborrheic Dermatitis**
3. **Lichen Planus**
4. **Pityriasis Rosea**
5. **Chronic Dermatitis**
6. **Pityriasis Rubra Pilaris**

Built with modern web technologies, the platform features a highly responsive **Next.js** frontend and a blazingly fast **FastAPI** Python backend, seamlessly deployed across **Vercel** and **Hugging Face Spaces**.

---

## ✨ Key Features

- **🤖 AI-Powered Diagnosis**: State-of-the-art scikit-learn model utilizing 34 parameters for precision predictions.
- **⚡ Lightning Fast API**: Python FastAPI backend ensuring low-latency inference.
- **🎨 Modern UI/UX**: Premium, accessible, and fully responsive user interface built with Tailwind CSS and Next.js App Router.
- **🚀 Scalable Architecture**: Decoupled frontend and backend hosted on serverless architectures (Vercel & Hugging Face).
- **🔒 Secure & Localized**: Zero patient data is stored; predictions are processed securely on the fly.
- **📱 Mobile Optimized**: Beautifully renders on all device sizes from desktops to mobile phones.

---

## 🏗️ Tech Stack

### Frontend (Client-Side)
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, React, TypeScript)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Deployment**: [Vercel](https://vercel.com/)

### Backend (Server-Side)
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python)
- **Machine Learning**: [Scikit-Learn](https://scikit-learn.org/), Pandas, Joblib
- **Containerization**: Docker
- **Deployment**: [Hugging Face Spaces](https://huggingface.co/spaces)

---

## 🚀 Getting Started (Local Development)

To get a local copy up and running, follow these simple steps.

### Prerequisites
*   Node.js (v18+)
*   Python (3.9+)

### 1️⃣ Backend Setup
Navigate to the backend directory and fire up the FastAPI server:
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
> The backend will be available at `http://localhost:8000`. 
> Access the interactive Swagger API docs at `http://localhost:8000/docs`.

### 2️⃣ Frontend Setup
Open a new terminal, navigate to the frontend directory, and start the Next.js dev server:
```bash
cd frontend
npm install
npm run dev
```
> The frontend will be available at `http://localhost:3000`.

*Note: For local testing with the local backend, you can set `NEXT_PUBLIC_API_URL=http://localhost:8000` in a `frontend/.env.local` file.*

---

## 🌍 Deployment

### Deploying the Backend to Hugging Face Spaces
1. Create a new Space on [Hugging Face](https://huggingface.co/spaces).
2. Choose **Docker** as the SDK.
3. Upload the contents of the `backend/` directory (`main.py`, `requirements.txt`, `Dockerfile`, `.pkl` files).
4. Hugging Face automatically builds and deploys your Dockerized ML API!

### Deploying the Frontend to Vercel
1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com/) and Import the repository.
3. Set the Root Directory to `frontend`.
4. Add the Environment Variable: `NEXT_PUBLIC_API_URL` (Set this to your Hugging Face Space URL).
5. Click **Deploy**!

---

## 📊 Dataset & Features

The model evaluates **34 features**, standardizing mostly on a scale of `0` to `3` (0: Absent, 1: Mild, 2: Moderate, 3: Severe).

<details>
<summary><strong>👉 Click here to view all 34 Clinical & Histopathological Features</strong></summary>

1. erythema (0-3)
2. scaling (0-3)
3. definite_borders (0-3)
4. itching (0-3)
5. koebner_phenomenon (0-3)
6. polygonal_papules (0-3)
7. follicular_papules (0-3)
8. oral_mucosal_involvement (0-3)
9. knee_and_elbow_involvement (0-3)
10. scalp_involvement (0-3)
11. family_history (0-1)
12. melanin_incontinence (0-3)
13. eosinophils_in_the_infiltrate (0-3)
14. PNL_infiltrate (0-3)
15. fibrosis_of_the_papillary_dermis (0-3)
16. exocytosis (0-3)
17. acanthosis (0-3)
18. hyperkeratosis (0-3)
19. parakeratosis (0-3)
20. clubbing_of_the_rete_ridges (0-3)
21. elongation_of_the_rete_ridges (0-3)
22. thinning_of_the_suprapapillary_epidermis (0-3)
23. spongiform_pustule (0-3)
24. munro_microabcess (0-3)
25. focal_hypergranulosis (0-3)
26. disappearance_of_the_granular_layer (0-3)
27. vacuolisation_and_damage_of_basal_layer (0-3)
28. spongiosis (0-3)
29. saw_tooth_appearance_of_retes (0-3)
30. follicular_horn_plug (0-3)
31. perifollicular_parakeratosis (0-3)
32. inflammatory_monoluclear_inflitrate (0-3)
33. band_like_infiltrate (0-3)
34. Age
</details>

---

## 👤 Author

**Made with ❤️ by Raghuvaran Lokati**

* **GitHub:** [@Raghuvaranlokati](https://github.com/Raghuvaranlokati)
* **Project Link:** [https://github.com/Raghuvaranlokati/skin_disease_model](https://github.com/Raghuvaranlokati/skin_disease_model)

If you find this project useful or interesting, please consider giving it a ⭐️ on GitHub!

---
<div align="center">
  <sub>Built for the future of Healthcare AI.</sub>
</div>
