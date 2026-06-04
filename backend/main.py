from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import joblib
import pandas as pd
import os

app = FastAPI(title="Skin Disease Prediction API")

# Setup CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production to match Vercel URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the models
model_path = os.path.join(os.path.dirname(__file__), "skin_disease_model.pkl")
scaler_path = os.path.join(os.path.dirname(__file__), "scaler.pkl")

try:
    model = joblib.load(model_path)
    scaler = joblib.load(scaler_path)
except Exception as e:
    print(f"Error loading models: {e}")
    model, scaler = None, None

class SkinDiseaseInput(BaseModel):
    erythema: int = Field(ge=0, le=3)
    scaling: int = Field(ge=0, le=3)
    definite_borders: int = Field(ge=0, le=3)
    itching: int = Field(ge=0, le=3)
    koebner_phenomenon: int = Field(ge=0, le=3)
    polygonal_papules: int = Field(ge=0, le=3)
    follicular_papules: int = Field(ge=0, le=3)
    oral_mucosal_involvement: int = Field(ge=0, le=3)
    knee_and_elbow_involvement: int = Field(ge=0, le=3)
    scalp_involvement: int = Field(ge=0, le=3)
    family_history: int = Field(ge=0, le=1) # usually 0 or 1
    melanin_incontinence: int = Field(ge=0, le=3)
    eosinophils_in_the_infiltrate: int = Field(ge=0, le=3)
    PNL_infiltrate: int = Field(ge=0, le=3)
    fibrosis_of_the_papillary_dermis: int = Field(ge=0, le=3)
    exocytosis: int = Field(ge=0, le=3)
    acanthosis: int = Field(ge=0, le=3)
    hyperkeratosis: int = Field(ge=0, le=3)
    parakeratosis: int = Field(ge=0, le=3)
    clubbing_of_the_rete_ridges: int = Field(ge=0, le=3)
    elongation_of_the_rete_ridges: int = Field(ge=0, le=3)
    thinning_of_the_suprapapillary_epidermis: int = Field(ge=0, le=3)
    spongiform_pustule: int = Field(ge=0, le=3)
    munro_microabcess: int = Field(ge=0, le=3)
    focal_hypergranulosis: int = Field(ge=0, le=3)
    disappearance_of_the_granular_layer: int = Field(ge=0, le=3)
    vacuolisation_and_damage_of_basal_layer: int = Field(ge=0, le=3)
    spongiosis: int = Field(ge=0, le=3)
    saw_tooth_appearance_of_retes: int = Field(ge=0, le=3)
    follicular_horn_plug: int = Field(ge=0, le=3)
    perifollicular_parakeratosis: int = Field(ge=0, le=3)
    inflammatory_monoluclear_inflitrate: int = Field(ge=0, le=3)
    band_like_infiltrate: int = Field(ge=0, le=3)
    Age: int = Field(ge=0, le=120)

DISEASE_CLASSES = {
    1: "Psoriasis",
    2: "Seborrheic dermatitis",
    3: "Lichen planus",
    4: "Pityriasis rosea",
    5: "Chronic dermatitis",
    6: "Pityriasis rubra pilaris"
}

@app.post("/predict")
async def predict(data: SkinDiseaseInput):
    if not model or not scaler:
        raise HTTPException(status_code=500, detail="Models are not loaded.")

    try:
        input_data = data.model_dump()
        
        feature_dict = {
            "erythema": input_data["erythema"],
            "scaling": input_data["scaling"],
            "definite_borders": input_data["definite_borders"],
            "itching": input_data["itching"],
            "koebner_phenomenon": input_data["koebner_phenomenon"],
            "polygonal_papules": input_data["polygonal_papules"],
            "follicular_papules": input_data["follicular_papules"],
            "oral_mucosal_involvement": input_data["oral_mucosal_involvement"],
            "knee_and_elbow_involvement": input_data["knee_and_elbow_involvement"],
            "scalp_involvement": input_data["scalp_involvement"],
            "family_history": input_data["family_history"],
            "melanin_incontinence": input_data["melanin_incontinence"],
            "eosinophils_in_the_infiltrate": input_data["eosinophils_in_the_infiltrate"],
            "PNL_infiltrate": input_data["PNL_infiltrate"],
            "fibrosis_of_the_papillary_dermis": input_data["fibrosis_of_the_papillary_dermis"],
            "exocytosis": input_data["exocytosis"],
            "acanthosis": input_data["acanthosis"],
            "hyperkeratosis": input_data["hyperkeratosis"],
            "parakeratosis": input_data["parakeratosis"],
            "clubbing_of_the_rete_ridges": input_data["clubbing_of_the_rete_ridges"],
            "elongation_of_the_rete_ridges": input_data["elongation_of_the_rete_ridges"],
            "thinning_of_the_suprapapillary_epidermis": input_data["thinning_of_the_suprapapillary_epidermis"],
            "spongiform_pustule": input_data["spongiform_pustule"],
            "munro_microabcess": input_data["munro_microabcess"],
            "focal_hypergranulosis": input_data["focal_hypergranulosis"],
            "disappearance_of_the_granular_layer": input_data["disappearance_of_the_granular_layer"],
            "vacuolisation_and_damage_of_basal_layer": input_data["vacuolisation_and_damage_of_basal_layer"],
            "spongiosis": input_data["spongiosis"],
            "saw-tooth_appearance_of_retes": input_data["saw_tooth_appearance_of_retes"],
            "follicular_horn_plug": input_data["follicular_horn_plug"],
            "perifollicular_parakeratosis": input_data["perifollicular_parakeratosis"],
            "inflammatory_monoluclear_inflitrate": input_data["inflammatory_monoluclear_inflitrate"],
            "band-like_infiltrate": input_data["band_like_infiltrate"],
            "Age": input_data["Age"]
        }

        df = pd.DataFrame([feature_dict])
        
        scaled_features = scaler.transform(df)
        
        prediction = model.predict(scaled_features)[0]
        
        disease_name = DISEASE_CLASSES.get(int(prediction), "Unknown")
        
        return {
            "prediction": int(prediction),
            "disease": disease_name
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
