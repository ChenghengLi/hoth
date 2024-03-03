from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


class Item(BaseModel):
    name: str
    description: str 
    price: float
    tax: float 


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


@app.get("/todo", tags=["todos"])
async def get_todos() -> str:
    return   "Welcome to Parcel Pointers! This learning lab is designed to help you learn everything about pointers and how they are used by following our robot Pipi through a warehouse. By the end of the learning lab, hopefully you should know how and where to use pointers in your own projects!"


@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to your todo list."}

@app.post("/items/")
async def create_item(item: Item):
    print(item)
    return item