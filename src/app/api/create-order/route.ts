export const runtime = "nodejs"
import Razorpay from "razorpay"
import { NextResponse } from "next/server"

export async function POST(req: Request) {

  try {

    const body = await req.json()
    
    const amount = Number(body.amount)

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY as string,
      key_secret: process.env.RAZORPAY_SECRET as string,
    })

    const order = await instance.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "test_receipt"
    })

    return NextResponse.json(order)

  } catch (err) {


    return NextResponse.json(
      { error: "Order creation failed" },
      { status: 500 }
    )
  }
}




// import { NextResponse } from "next/server"

// export async function POST() {

//   return NextResponse.json({
//     success: true,
//     message: "API working"
//   })
// }
