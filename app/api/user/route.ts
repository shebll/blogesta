import prisma from "@/prisma";
import { NextResponse } from "next/server";
import { connectDb } from "../blogs/route";

// api end point for get all users "/user" GET Method
export const GET =async (req :Request,res :NextResponse) => {
  try{
    await connectDb();
    const users = await prisma.user.findMany()
    return NextResponse.json({message:"connect to database" ,users},{status:200})
  } catch (error){   
    return NextResponse.json({message:"can ont connect to database" ,error},{status:500})
  }finally{
    await prisma.$disconnect()
  }
}
// api end point for create new user "/user" POST Method
export const POST =async (req :Request,res :NextResponse) => {
  try{
    await connectDb();
    const {name ,email} = await req.json()
    const user = await prisma.user.create({data:{name,email}})
    return NextResponse.json({message:"user successfully created" ,user},{status:201})
  } catch (error){
    return NextResponse.json({message:"user did not created" ,error},{status:500})
  }finally{
    await prisma.$disconnect()
  }
}
