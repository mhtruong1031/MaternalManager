import numpy as np
import json

from google import genai
from google.genai import types

from EmbeddedTable import EmbeddedTable
from config import *

from pydantic import BaseModel

SYMPTOM_PATH = "infant_symptom_embeddings.json"
MAX_TOKENS   = 1000

class Pipeline:
    def __init__(self):
        self.symptom_table             = EmbeddedTable(SYMPTOM_PATH)
        self.current_symptom_embedding = [1 for symptom in self.symptom_table.embedding_labels]

        # Gemini Configurables
        self.api_key       = API_KEY
        self.max_tokens    = MAX_TOKENS

        self.client = genai.Client(api_key=API_KEY)
    
    def gemini_query(self, prompt: str):
        response = self.client.models.generate_content(
            model    = 'gemini-2.0-flash',
            contents = prompt,
            config   = {
                "system_instruction": "You are an advisor for new parents. Speak in a friendly, warm tone. Speak briefly and use emojis."
            }
        )

        return response.text.strip()
    
    def parse_query_to_json(self, prompt: str):
        embedding  = []
        response = self.client.models.generate_content(
            model    = 'gemini-2.0-flash',
            contents = prompt,
            config   = {
                "response_mime_type": "application/json",
                "response_schema": list[SymptomEmbedding],
                "system_instruction": "You are a prompt parser. Please parse through prompts and return them as a json of 1's if the symptom isn't mentioned. If it is mentioned, 2's (true) when the user describes the matching symptom and 0's (false) when the user explicitly says they do not have it."
            },
        )
        response = response.parsed[0]

        for symptom in self.symptom_table.embedding_labels:
            eval(f'embedding.append(int(response.{symptom}))')

        return embedding
    
    # Main runtime function
    def run(self, user_prompt: str) -> tuple[str, float]:
        user_embedding                 = self.parse_query_to_json(user_prompt)

        for i, item in enumerate(user_embedding):
            if item != 1:
                self.current_symptom_embedding[i] = item

        print(self.current_symptom_embedding)

        confidence, predicted_disease = self.symptom_table.find_similar(self.current_symptom_embedding)
        is_final_page = confidence >= 0.8

        if is_final_page:
            response = self.gemini_query(f"Please tell me that my child has {predicted_disease} at a confidence of {confidence*100}%. Then, give action steps")
        else:
            jacobian = self.symptom_table._calculate_confidence_jacobian(self.current_symptom_embedding, [self.symptom_table.data.get(key) for key in self.symptom_table.data.keys()])
            jacobian = jacobian.transpose() # Transpose to have access to the column space

            grad_magnitudes = [np.linalg.norm(column) if self.current_symptom_embedding[i] == 1 else 0 for i, column in enumerate(jacobian)]

            priority_input = self.symptom_table.embedding_labels[np.argmax(grad_magnitudes)]

            response = self.gemini_query(f"Please ask a question directed towards a parent about her current baby's status on {priority_input}")

        json_dict = {
            "messsage": response,
            "confidence": int(confidence * 100),
            "is_final_page": is_final_page,
            "top_three": []
        }

        return json.dumps(json_dict)
        


class SymptomEmbedding(BaseModel):
    diarrhea: int
    no_urine: int
    no_bowel: int
    stomach_pain: int
    fever: int
    breathing_fast: int
    rib_pull_in: int
    wheezing: int
    runny_nose: int
    umbilical_cord_problems: int
    jaundice: int
    crying: int
    no_sleepy: int
    sleepy: int
    no_milk: int
    vomit: int
    rash: int
    ear_pain: int
    sore_throat: int
