import numpy as np
import json

class EmbeddedTable:
    def __init__(self, json_path: str, output_labels: list[str] = None, data: dict = {}):
        self.embedding_labels = output_labels
        self.data             = data

        if json_path:
            self.load_json(json_path)

    def load_json(self, json_path: str):
        with open(json_path, 'r') as file:
            data: dict = json.load(file)
        
        for key in data.keys():
            value = data.get(key)

            if key == 'labels':
                self.embedding_labels = value
                continue
            
            self.data[key] = value

    def get(self, query: str) -> np.array:
        if query in self.data.keys():
            return np.array(self.data.get(query))
        return -1
    
    def find_similar(self, embedding_query: list[int]) -> tuple[str, float]:
        vector_embedding = np.array(embedding_query)
        confidences      = []

        for label in self.data.keys():
            disease_embedding = self.get(label)
            confidence = self.__calculate_confidence(vector_embedding, disease_embedding)
            confidences.append(confidence)

        return (max(confidences), list(self.data.keys())[confidences.index(max(confidences))])
    
    def __calculate_confidence(self, vector_a, vector_b):
        eps = 1e-8  # to avoid divide by zero

        percent_error = np.abs(vector_a - vector_b) / (np.abs(vector_b) + eps)
        mean_error = np.mean(percent_error)
        confidence = 1 - mean_error  # this will be between 0 and 1

        return confidence
    
    # Rows are disease states
    # Columns are symptoms
    def _calculate_confidence_jacobian(self, vector_a, vector_b_batch):
        vector_a       = np.array(vector_a)
        vector_b_batch = np.array(vector_b_batch)
        
        eps = 1e-8  # prevent divide by zero
        n   = len(vector_a)
        m   = vector_b_batch.shape[0]  # number of vectors in the batch
        
        jacobian = np.zeros((m, n))
        
        for i in range(m):
            batch = vector_b_batch[i]
            term  = 1 - batch / (vector_a + eps)
            grad  = -(1/n) * np.sign(term) * (batch / ((vector_a + eps)**2))
            jacobian[i] = grad
            
        return jacobian
        
        





