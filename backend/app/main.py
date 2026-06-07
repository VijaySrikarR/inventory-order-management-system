from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine

from app.models.models import (
Product,
Customer,
Order,
OrderItem
)

from app.routes.products import router as products_router
from app.routes.customers import router as customers_router
from app.routes.orders import router as orders_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
title="Inventory & Order Management API",
description="Manage Products, Customers and Orders",
version="1.0.0"
)

app.add_middleware(
CORSMiddleware,
allow_origins=["*"],
allow_credentials=True,
allow_methods=["*"],
allow_headers=["*"]
)

app.include_router(products_router)
app.include_router(customers_router)
app.include_router(orders_router)

@app.get("/")
def root():
    return {
"status": "running",
"service": "Inventory Management API"
}

@app.get("/health")
def health():
    return {
"status": "healthy"
}
