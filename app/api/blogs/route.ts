import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function connectDb() {
  try{
    await prisma.$connect();
  } catch (error){
    return Error("can ont connect to database");
  }
}
export const GET =async (req :Request,res :NextResponse) => {
  try{
    await connectDb();
    const posts = prisma.post.findMany()
    return NextResponse.json({message:"connect to database" ,posts},{status:200})
  } catch (error){   
    return NextResponse.json({message:"can ont connect to database" ,error},{status:500})
  }finally{
    await prisma.$disconnect()
  }
}
export const POST =async (req :Request,res :NextResponse) => {
  try{
    await connectDb();
    const{}
  } catch (error){
    return NextResponse.json({message:"can ont connect to database" ,error},{status:200})
  }
}