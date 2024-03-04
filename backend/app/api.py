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

class PersonItem(BaseModel):
    flowers: list
    notes: int
    list_notes: list


def read_obituaries(filename):
    current_dir = os.path.dirname(__file__)
    file_path = os.path.join(current_dir, filename)
    with open(file_path , 'r') as file:
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


def getUserInfo(filename):
    current_dir = os.path.dirname(__file__)
    file_path = os.path.join(current_dir, "obituary", filename)
    
    with open(file_path + ".txt", 'r') as file:
        # Read the lines and filter out any that are just whitespace
        lines = [line for line in file.readlines() if not line.isspace()]
    
    # Parse the random numbers for flowers as a list of integers
    flowers = list(map(int, lines[0].strip().split(',')))
    # Parse the number of notes
    notes = int(lines[1].strip())
    # Parse the list of notes, stripping any leading/trailing whitespace
    list_notes = [note.strip() for note in lines[2:]]
    
    # Create an instance of PersonItem with the parsed data
    obituary = PersonItem(flowers=flowers, notes=notes, list_notes=list_notes)
    
    return obituary

getUserInfo("5e1070f5-3b8e-4e88-93e7-1b68b9b3b8b4")

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


@app.get("/userGet")
async def get_userinfo(uid) -> PersonItem:
    return  getUserInfo(uid)

@app.get("/userPost")
async def post_userinfo(uid, info):
    random_numbers = info.flowers
    number_of_notes = info.notes   
    notes_content = info.list_notes

    # Define the file path
    file_path = f"obituary/{uid}.txt"
    
    # Ensure the directory exists
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    
    # Open the file for writing
    with open(file_path, 'w') as file:
        # Write the 8 random numbers separated by commas
        file.write(','.join(random_numbers) + "\n")
        # Write the number of notes
        file.write(f"{number_of_notes}\n")
        # Write each note on a new line
        for note in notes_content:
            file.write(note + "\n")

@app.get("/obituariesGet")
async def get_obituaries() -> List[ObituaryItem]:
    return  read_obituaries("obituaries.txt")


@app.post("/obituariesPost")
async def post_obituary(item: ObituaryItem):
    write_obituaries("obituaries.txt", item)
    return item