from pydantic import BaseModel, EmailStr


class ProductCreate(BaseModel):
    sku: str
    name: str
    price: float
    stock_quantity: int


class ProductResponse(ProductCreate):
    id: int

    model_config = {
        "from_attributes": True
    }


class CustomerCreate(BaseModel):
    name: str
    email: EmailStr


class CustomerResponse(CustomerCreate):
    id: int

    model_config = {
        "from_attributes": True
    }


class OrderItemCreate(BaseModel):
    product_id: int
    quantity: int


class OrderCreate(BaseModel):
    customer_id: int
    items: list[OrderItemCreate]

ProductCreate
ProductResponse