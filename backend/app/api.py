from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import os
import csv

class ObituaryItem(BaseModel):
    UID: str
    name: str
    latitude: float
    longitude: float
    

def read_obituaries(filename):
    current_dir = os.path.dirname(__file__)
    file_path = os.path.join(current_dir, filename)
    with open(file_path, 'r') as file:
        lines = file.readlines()
        obituaries = []
        for line in lines[1:]:  # Skip the header line
            UID, name, latitude, longitude = line.strip().split(',')
            obituary_item = ObituaryItem(
                UID=UID,
                name=name,
                latitude=float(latitude),
                longitude=float(longitude)
            )
            obituaries.append(obituary_item)
    return obituaries

def write_obituaries(filename, item):
    current_dir = os.path.dirname(__file__)
    file_path = os.path.join(current_dir, filename)
    with open(file_path, mode='a', newline='') as file:
        writer = csv.writer(file)
        writer.writerow([item.UID, item.name, item.latitude, item.longitude])





app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

todos = [
    {
        "id": "1",
        "item": "Read a book."
    },
    {
        "id": "2",
        "item": "Cycle around town."
    }
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)



@app.get("/obituariesGet", tags=["todos"])
async def get_obituaries() -> List[ObituaryItem]:
    return  read_obituaries("obituaries.txt")


@app.post("/obituariesPost")
async def post_obituary(item: ObituaryItem):
    write_obituaries("obituaries.txt", item)
    return item