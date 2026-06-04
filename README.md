# Skin Disease Prediction Full-Stack Application

This is a full-stack web application designed for predicting skin diseases based on 34 patient features. It features a modern, responsive UI built with Next.js and a scalable backend built with FastAPI.

## Project Structure

*   `frontend/`: A Next.js 15 application using the App Router, React, TypeScript, and Tailwind CSS.
*   `backend/`: A FastAPI application serving a machine learning model (`skin_disease_model.pkl` and `scaler.pkl`).

## Local Development

### Prerequisites
*   Node.js (v18+)
*   Python (3.9+)

### Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
3.  Run the FastAPI server:
    ```bash
    uvicorn main:app --reload
    ```
    The backend will be available at `http://localhost:8000`. You can access the interactive API docs at `http://localhost:8000/docs`.

### Frontend Setup

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set the API URL for local development (optional, defaults to localhost). You can create a `.env.local` file:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:8000
    ```
4.  Run the development server:
    ```bash
    npm run dev
    ```
    The frontend will be available at `http://localhost:3000`.

## Deployment

### Backend (Hugging Face Spaces)

The backend is configured to be easily deployed to Hugging Face Spaces using Docker.

1.  Create a new Space on Hugging Face.
2.  Choose "Docker" as the SDK.
3.  Upload the contents of the `backend/` directory (including `main.py`, `requirements.txt`, `Dockerfile`, and the `.pkl` files) to the Space.
4.  Hugging Face will automatically build and run the Docker container.
5.  Note the public URL of your Space API (e.g., `https://your-username-space-name.hf.space`).

### Frontend (Vercel)

1.  Push your repository to GitHub.
2.  Log in to Vercel and create a new project.
3.  Import the repository and set the Root Directory to `frontend`.
4.  Add an Environment Variable:
    *   Name: `NEXT_PUBLIC_API_URL`
    *   Value: *The public URL of your deployed Hugging Face Space API.*
5.  Deploy the project.

## Features

The model uses the following 34 features to predict between 6 skin disease classes (Psoriasis, Seborrheic dermatitis, Lichen planus, Pityriasis rosea, Chronic dermatitis, Pityriasis rubra pilaris):

1.  erythema (0-3)
2.  scaling (0-3)
3.  definite_borders (0-3)
4.  itching (0-3)
5.  koebner_phenomenon (0-3)
6.  polygonal_papules (0-3)
7.  follicular_papules (0-3)
8.  oral_mucosal_involvement (0-3)
9.  knee_and_elbow_involvement (0-3)
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
