from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.models import (
    Product,
    Order,
    OrderItem,
    Customer
)
from app.schemas.schemas import OrderCreate

router = APIRouter(
    prefix="/orders",
    tags=["Orders"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/")
def create_order(
    order: OrderCreate,
    db: Session = Depends(get_db)
):

    customer = db.query(Customer).filter(
        Customer.id == order.customer_id
    ).first()

    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    total_amount = 0

    for item in order.items:

        product = db.query(Product).filter(
            Product.id == item.product_id
        ).first()

        if not product:
            raise HTTPException(
                status_code=404,
                detail=f"Product {item.product_id} not found"
            )

        if product.stock_quantity < item.quantity:
            raise HTTPException(
                status_code=400,
                detail=f"Insufficient stock for {product.name}"
            )

        total_amount += (
            product.price * item.quantity
        )

    db_order = Order(
        customer_id=order.customer_id,
        total_amount=total_amount
    )

    db.add(db_order)
    db.commit()
    db.refresh(db_order)

    for item in order.items:

        product = db.query(Product).filter(
            Product.id == item.product_id
        ).first()

        product.stock_quantity -= item.quantity

        db.add(
            OrderItem(
                order_id=db_order.id,
                product_id=item.product_id,
                quantity=item.quantity
            )
        )

    db.commit()

    return {
        "message": "Order created successfully",
        "order_id": db_order.id,
        "total_amount": total_amount
    }


@router.get("/")
def get_orders(
    db: Session = Depends(get_db)
):
    return db.query(Order).all()

@router.delete("/{order_id}")
def delete_order(
    order_id: int,
    db: Session = Depends(get_db)
):
    order = db.query(Order).filter(
        Order.id == order_id
    ).first()

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    db.delete(order)
    db.commit()

    return {
        "message": "Order deleted"
    }

@router.get("/{order_id}")
def get_order(
    order_id: int,
    db: Session = Depends(get_db)
):
    order = db.query(Order).filter(
        Order.id == order_id
    ).first()

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    return order


@router.delete("/{order_id}")
def delete_order(
    order_id: int,
    db: Session = Depends(get_db)
):
    order = db.query(Order).filter(
        Order.id == order_id
    ).first()

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    db.delete(order)
    db.commit()

    return {"message":"Order deleted"}